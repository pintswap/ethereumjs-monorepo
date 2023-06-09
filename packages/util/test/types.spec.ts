import { bytesToHex } from 'ethereum-cryptography/utils'
import * as tape from 'tape'

import {
  TypeOutput,
  bigIntToBytes,
  bigIntToHex,
  bytesToBigInt,
  intToBytes,
  intToHex,
  toBytes,
  toType,
} from '../src'

tape('toType', function (t) {
  t.test('from null and undefined', function (st) {
    st.equal(toType(null, TypeOutput.Number), null)
    st.equal(toType(null, TypeOutput.BigInt), null)
    st.equal(toType(null, TypeOutput.Uint8Array), null)
    st.equal(toType(null, TypeOutput.PrefixedHexString), null)
    st.equal(toType(undefined, TypeOutput.Number), undefined)
    st.equal(toType(undefined, TypeOutput.BigInt), undefined)
    st.equal(toType(undefined, TypeOutput.Uint8Array), undefined)
    st.equal(toType(undefined, TypeOutput.PrefixedHexString), undefined)
    st.end()
  })
  t.test('from Number', function (st) {
    const num = 1000
    st.test('should convert to Number', function (st) {
      const result = toType(num, TypeOutput.Number)
      st.strictEqual(result, num)
      st.end()
    })
    st.test('should convert to BigInt', function (st) {
      const result = toType(num, TypeOutput.BigInt)
      st.equal(result, BigInt(num))
      st.end()
    })
    st.test('should convert to Uint8Array', function (st) {
      const result = toType(num, TypeOutput.Uint8Array)
      st.deepEquals(result, intToBytes(num))
      st.end()
    })
    st.test('should convert to PrefixedHexString', function (st) {
      const result = toType(num, TypeOutput.PrefixedHexString)
      st.strictEqual(result, bytesToHex(bigIntToBytes(BigInt(num))))
      st.end()
    })
    st.test('should throw an error if greater than MAX_SAFE_INTEGER', function (st) {
      st.throws(() => {
        const num = Number.MAX_SAFE_INTEGER + 1
        toType(num, TypeOutput.BigInt)
      }, /^Error: The provided number is greater than MAX_SAFE_INTEGER \(please use an alternative input type\)$/)
      st.end()
    })
  })
  t.test('from BigInt', function (st) {
    const num = BigInt(1000)
    st.test('should convert to Number', function (st) {
      const result = toType(num, TypeOutput.Number)
      st.strictEqual(result, Number(num))
      st.end()
    })
    st.test('should convert to BigInt', function (st) {
      const result = toType(num, TypeOutput.BigInt)
      st.equal(result, num)
      st.end()
    })
    st.test('should convert to Uint8Array', function (st) {
      const result = toType(num, TypeOutput.Uint8Array)
      st.deepEquals(result, bigIntToBytes(num))
      st.end()
    })
    st.test('should convert to PrefixedHexString', function (st) {
      const result = toType(num, TypeOutput.PrefixedHexString)
      st.strictEqual(result, bytesToHex(bigIntToBytes(num)))
      st.end()
    })
    st.test(
      'should throw an error if converting to Number and greater than MAX_SAFE_INTEGER',
      function (st) {
        const num = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)
        st.throws(() => {
          toType(num, TypeOutput.Number)
        }, /^Error: The provided number is greater than MAX_SAFE_INTEGER \(please use an alternative output type\)$/)
        st.end()
      }
    )
  })
  t.test('from Uint8Array', function (st) {
    const num = intToBytes(1000)
    st.test('should convert to Number', function (st) {
      const result = toType(num, TypeOutput.Number)
      st.deepEquals(intToBytes(result), num)
      st.end()
    })
    st.test('should convert to BigInt', function (st) {
      const result = toType(num, TypeOutput.BigInt)
      st.equal(result, bytesToBigInt(num))
      st.end()
    })
    st.test('should convert to Uint8Array', function (st) {
      const result = toType(num, TypeOutput.Uint8Array)
      st.deepEquals(result, num)
      st.end()
    })
    st.test('should convert to PrefixedHexString', function (st) {
      const result = toType(num, TypeOutput.PrefixedHexString)
      st.strictEqual(result, bytesToHex(num))
      st.end()
    })
  })
  t.test('from HexPrefixedString', function (st) {
    const num = intToHex(1000)
    st.test('should convert to Number', function (st) {
      const result = toType(num, TypeOutput.Number)
      st.strictEqual(intToHex(result), num)
      st.end()
    })
    st.test('should convert to BigInt', function (st) {
      const result = toType(num, TypeOutput.BigInt)
      st.strictEqual(bigIntToHex(result), num)
      st.end()
    })
    st.test('should convert to Uint8Array', function (st) {
      const result = toType(num, TypeOutput.Uint8Array)
      st.deepEquals(result, toBytes(num))
      st.end()
    })
    st.test('should throw an error if is not 0x-prefixed', function (st) {
      st.throws(() => {
        toType('1', TypeOutput.Number)
      }, /^Error: A string must be provided with a 0x-prefix, given: 1$/)
      st.end()
    })
  })
})
