import { bytesToHex } from 'ethereum-cryptography/utils'
import * as tape from 'tape'

import {
  KECCAK256_NULL,
  KECCAK256_NULL_S,
  KECCAK256_RLP,
  KECCAK256_RLP_ARRAY,
  KECCAK256_RLP_ARRAY_S,
  KECCAK256_RLP_S,
  MAX_INTEGER,
  TWO_POW256,
} from '../src'

tape('constants', function (t) {
  t.test('should match constants', function (st) {
    st.equal(
      MAX_INTEGER.toString(16),
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )

    st.equal(
      TWO_POW256.toString(16),
      '10000000000000000000000000000000000000000000000000000000000000000'
    )

    st.equal(
      TWO_POW256.toString(16),
      '10000000000000000000000000000000000000000000000000000000000000000'
    )

    st.equal(KECCAK256_NULL_S, 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470')

    st.equal(
      bytesToHex(KECCAK256_NULL),
      'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
    )

    st.equal(
      KECCAK256_RLP_ARRAY_S,
      '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'
    )

    st.equal(
      bytesToHex(KECCAK256_RLP_ARRAY),
      '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'
    )

    st.equal(KECCAK256_RLP_S, '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421')

    st.equal(
      bytesToHex(KECCAK256_RLP),
      '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'
    )

    st.end()
  })
})
