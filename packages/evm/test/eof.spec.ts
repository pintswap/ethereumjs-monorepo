import { bytesToHex, hexToBytes } from 'ethereum-cryptography/utils'
import * as tape from 'tape'

import { getEOFCode } from '../src/eof'

function generateEOFCode(code: string) {
  const len = (code.length / 2).toString(16).padStart(4, '0')
  return '0xEF000101' + len + '00' + code
}

function generateInvalidEOFCode(code: string) {
  const len = (code.length / 2 + 1).toString(16).padStart(4, '0') // len will be 1 too long
  return '0xEF000101' + len + '00' + code
}

tape('getEOFCode()', (t) => {
  const code = '600100'
  const validEofCode = generateEOFCode(code)
  const invalidEofCode = generateInvalidEOFCode(code)

  t.equal(
    bytesToHex(getEOFCode(hexToBytes(validEofCode.slice(2)))),
    code,
    'returned just code section of EOF container'
  )
  t.equal(
    bytesToHex(getEOFCode(hexToBytes(invalidEofCode.slice(2)))),
    invalidEofCode.toLowerCase().slice(2),
    'returns entire code string for non EOF code'
  )
  t.end()
})
