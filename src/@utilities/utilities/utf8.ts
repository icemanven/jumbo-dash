/**
 * Created by ICEMANven on 22/08/2018.
 */

export class Utf8 {
  stringFromCharCode: any;
  byteIndex: number;
  byteCount: number;
  byteArray: any[];

  constructor () {
    this.stringFromCharCode = String.fromCharCode;
  }

  ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    let value;
    let extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) === 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  // Taken from https://mths.be/punycode
   ucs2encode(array) {
    const length = array.length;
    let index = -1;
    let value;
    let output = '';
    while (++index < length) {
      value = array[index];
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += this.stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += this.stringFromCharCode(value);
    }
    return output;
  }

   checkScalarValue(codePoint) {
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      throw Error(
        'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
        ' is not a scalar value'
      );
    }
  }
  /*--------------------------------------------------------------------------*/

   createByte(codePoint, shift) {
    return this.stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
  }

   encodeCodePoint(codePoint) {
    if ((codePoint & 0xFFFFFF80) === 0) { // 1-byte sequence
      return this.stringFromCharCode(codePoint);
    }
    let symbol = '';
    if ((codePoint & 0xFFFFF800) === 0) { // 2-byte sequence
      symbol = this.stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
    } else if ((codePoint & 0xFFFF0000) === 0) { // 3-byte sequence
      this.checkScalarValue(codePoint);
      symbol = this.stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
      symbol += this.createByte(codePoint, 6);
    } else if ((codePoint & 0xFFE00000) === 0) { // 4-byte sequence
      symbol = this.stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
      symbol += this.createByte(codePoint, 12);
      symbol += this.createByte(codePoint, 6);
    }
    symbol += this.stringFromCharCode((codePoint & 0x3F) | 0x80);
    return symbol;
  }

   utf8encode(string) {
    const codePoints = this.ucs2decode(string);
    const length = codePoints.length;
    let index = -1;
    let codePoint;
    let byteString = '';
    while (++index < length) {
      codePoint = codePoints[index];
      byteString += this.encodeCodePoint(codePoint);
    }
    return byteString;
  }

  /*--------------------------------------------------------------------------*/

   readContinuationByte() {
    if (this.byteIndex >= this.byteCount) {
      throw Error('Invalid byte index');
    }

    const continuationByte = this.byteArray[this.byteIndex] & 0xFF;
    this.byteIndex++;

    if ((continuationByte & 0xC0) === 0x80) {
      return continuationByte & 0x3F;
    }

    // If we end up here, it’s not a continuation byte
    throw Error('Invalid continuation byte');
  }

   decodeSymbol() {
    let byte1;
    let byte2;
    let byte3;
    let byte4;
    let codePoint;

    if (this.byteIndex > this.byteCount) {
      throw Error('Invalid byte index');
    }

    if (this.byteIndex === this.byteCount) {
      return false;
    }

    // Read first byte
    byte1 = this.byteArray[this.byteIndex] & 0xFF;
    this.byteIndex++;

    // 1-byte sequence (no continuation bytes)
    if ((byte1 & 0x80) === 0) {
      return byte1;
    }

    // 2-byte sequence
    if ((byte1 & 0xE0) === 0xC0) {
      byte2 = this.readContinuationByte();
      codePoint = ((byte1 & 0x1F) << 6) | byte2;
      if (codePoint >= 0x80) {
        return codePoint;
      } else {
        throw Error('Invalid continuation byte');
      }
    }

    // 3-byte sequence (may include unpaired surrogates)
    if ((byte1 & 0xF0) === 0xE0) {
      byte2 = this.readContinuationByte();
      byte3 = this.readContinuationByte();
      codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
      if (codePoint >= 0x0800) {
        this.checkScalarValue(codePoint);
        return codePoint;
      } else {
        throw Error('Invalid continuation byte');
      }
    }

    // 4-byte sequence
    if ((byte1 & 0xF8) === 0xF0) {
      byte2 = this.readContinuationByte();
      byte3 = this.readContinuationByte();
      byte4 = this.readContinuationByte();
      codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
        (byte3 << 0x06) | byte4;
      if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
        return codePoint;
      }
    }

    throw Error('Invalid UTF-8 detected');
  }

   utf8decode(byteString) {
    this.byteArray = this.ucs2decode(byteString);
    this.byteCount = this.byteArray.length;
    this.byteIndex = 0;
    const codePoints = [];
    let tmp;
    while ((tmp = this.decodeSymbol()) !== false) {
      codePoints.push(tmp);
    }
    return this.ucs2encode(codePoints);
  }
}


