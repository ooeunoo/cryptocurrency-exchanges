export interface IUpbitError {
  error: {
    message: string
    name: string
  }
}

export const UPBIT_ERROR: { [key: string]: string } = {
  create_ask_error:
    '주문 요청 정보가 올바르지 않습니다. 파라미터 값이 올바른지 확인해주세요.',
  create_bid_error:
    '주문 요청 정보가 올바르지 않습니다. 파라미터 값이 올바른지 확인해주세요.',
  insufficient_funds_ask: '매수/매도 가능 잔고가 부족합니다.',
  insufficient_funds_bid: '매수/매도 가능 잔고가 부족합니다.',
  under_min_total_ask: '주문 요청 금액이 최소주문금액 미만입니다.',
  under_min_total_bid: '주문 요청 금액이 최소주문금액 미만입니다.',
  withdraw_address_not_registerd:
    '허용되지 않은 출금 주소입니다. 업비트 웹 > [MY] > [Open API 관리] > [디지털 자산 출금주소 관리] 페이지에서 등록 후 진행해주세요',
  validation_error:
    '잘못된 API 요청입니다. 누락된 파라미터가 없는지 확인해주세요.',
  invalid_query_payload:
    '올바르지 않는 서명입니다. AccessKey 또는 SecretKey가 올바른지 확인 후 이용해주세요.',
  invalid_access_key: '올바르지 않은 AccessKey 입니다.',
  invalid_secret_key: '올바르지 않은 SecretKey 입니다.',
  jwt_verification:
    '올바르지 않는 서명입니다. AccessKey 또는 SecretKey가 올바른지 확인 후 이용해주세요.',
  expired_acess_key:
    'API Key가 만료되었습니다. 업비트 웹 > [MY] > [Open API 관리] > [Open API Key 관리] 페이지에서 재 발급 & 등록 후 진행해주세요.',
  nonce_used: '이미 요청한 nonce값이 다시 사용되었습니다.',
  no_authorization_i_p:
    '허용되지 않은 IP 주소 입니다. 업비트 웹 > [MY] > [Open API 관리] > [Open API Key 관리] > [IP 주소 등록]에 올바른 IP를 입력 후 재 발급 & 등록 후 진행해주세요.',
  out_of_scope: '허용되지않은 기능입니다.',
}
