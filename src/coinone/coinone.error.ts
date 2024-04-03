export interface IError {
  result: string
  error_code: string
  error_msg: string
}

export const error = {
  'Blocked user access': '제한된 사용자의 접근입니다.',
  'Request Token Parameter is needed': '토큰 파라미터 요청이 필요합니다.',
  'Access token is missing': '액세스 토큰이 필요합니다.',
  'Invalid access token': '유효하지 않은 액세스 토큰입니다.',
  'This service does not exist': '존재하지 않은 API 서비스입니다.',
  'Customers who need to register for API usage':
    'API 사용을 위한 등록이 필요합니다.',
  'This service is not approved': '승인되지 않은 서비스입니다.',
  'Invalid App Secret':
    '유효하지 않은 App Secret입니다. 코인원 웹 > Open API 메뉴에서 상태 확인 부탁드립니다.',
  'Invalid App Id':
    '유효하지 않은 APP ID입니다. 코인원 웹 > Open API 메뉴에서 상태 확인 부탁드립니다.',
  'Request Token does not exist': '존재하지 않은 Request Token입니다.',
  'Failed to delete Request Token': 'Request Token 삭제를 실패했습니다.',
  'Access Token does not exist': '존재하지 않은 Access Token입니다.',
  'Failed to delete Access Token': 'Access Token 삭제 실패했습니다.',
  'Failed to refresh Access Token':
    'Access Token을 리프레쉬하는 데 실패했습니다.',
  'Invalid API permission': '승인되지 않은 API 권한입니다.',
  'You can use the API after complete Coinone identity verification by web or app':
    '코인원 웹이나 앱을 통한 KYC 인증 이후 API 이용이 가능합니다.',
  'This API is no longer available': '더 이상 유효하지 않은 API입니다.',
  'Customers who did not complete the real name account verification are not allowed to use this service':
    '실명 계좌 인증을 완료하지 않은 고객은 이 서비스를 사용할 수 없습니다. 코인원 앱을 통해 실명 계좌 인증이 필요합니다.',
  'Two Factor Auth Fail': '2-Factor 인증 실패했습니다.',
  'Invalid format': '유효하지 않은 포맷입니다.',
  'Lack of Balance': '잔고가 부족합니다.',
  'Order id is not exist': '존재하지 않은 주문입니다.',
  'Price is not correct': '올바르지 않은 가격입니다.',
  'Parameter error': '파라메터 에러입니다.',
  'Unknown cryptocurrency': '존재하지 않은 종목 심볼입니다.',
  'Unknown cryptocurrency pair': '존재하지 않은 거래 종목입니다.',
  'The order unavailable due to significant price difference between the order price and the current price':
    '주문 가격과 현재 가격의 현격한 차이로 주문이 불가합니다.',
  'Quantity is too low': '최소 수량 미달로 요청이 불가합니다.',
  'This is not a valid your order amount': '유효하지 않은 주문 수량입니다.',
  'The sum of the holding quantity and the quantity of active orders has exceeded the maximum quantity':
    '보유 수량과 등록된 주문 수량의 합이 최대 수량을 초과했습니다.',
  'Already Traded': '이미 체결된 주문입니다.',
  'Already Canceled': '이미 취소된 주문입니다.',
  'Already Submitted': '이미 등록된 주문입니다.',
  'V2 API payload is missing': 'V2 API payload 값 입력이 필요합니다.',
  'V2 API signature is missing': 'V2 API signature 값 입력이 필요합니다.',
  'V2 API nonce is missing': 'V2 API nonce 값 입력이 필요합니다.',
  'V2 API signature is not correct': 'V2 API signature 값이 올바르지 않습니다.',
  'V2 API Nonce value must be a positive integer':
    'V2 API Nonce 값은 양의 숫자 값이어야 합니다.',
  'V2 API Nonce is must be bigger then last nonce':
    'V2 API Nonce 값은 이전 Nonce 값보다 커야 합니다.',
  'Nonce already used': '이미 사용된 Nonce 값입니다.',
  'Nonce must be in the form of a UUID': 'Nonce값은 UUID 포맷이어야 합니다.',
  "It's V2 API. V1 Access token is not acceptable":
    'V1의 Access Token으로는 V2 API 이용이 불가합니다.',
  'Invalid address': '유효하지 않은 주소입니다.',
  'The address is detected by FDS. Please contact our customer center':
    'FDS에 의해 제한된 주소입니다. 고객 센터로 연락 부탁드립니다.',
  'The address is not registered as an API withdrawal address':
    'API 출금 주소 등록이 필요한 주소입니다.',
  "Withdrawal through the 'CODE Solution' requires registration of the deposit address":
    'CODE 솔루션을 통한 출금을 위해서는 입금 주소 생성이 필요합니다. 코인원 웹/앱에서 입금주소 생성 후 요청하시기 바랍니다.',
  'The withdrawal address does not exist': '존재하지 않은 출금 주소입니다.',
  'Insufficient balance': '잔액이 부족합니다.',
  'Minimum withdrawal quantity insufficient':
    '최소 출금 가능 금액보다 부족합니다.',
  'Required the memo to proceed with the withdrawal':
    '출금을 위해서는 Memo 입력이 필요합니다.',
  'Withdrawal/Deposit id is invalid':
    '단일 입출금 내역 조회 시 올바르지 않은 입출금 내역 식별 ID가 입력된 경우입니다.',
  'price is required for LIMIT or STOP_LIMIT order':
    '지정가, 예약 지정가 주문시 필수정보인 가격필드가 입력되지 않은 경우입니다.',
  'qty is required for LIMIT or STOP_LIMIT or MARKET(SELL) order':
    '지정가, 예약 지정가, 시장가(매도), 주문시 필수정보인 수량필드가 입력되지 않은 경우입니다.',
  'post_only is required for LIMIT order':
    '지정가 주문시 필수정보인 post_only필드가 입력되지 않은 경우입니다.',
  'trigger_price is required for STOP_LIMIT order':
    '예약 지정가 주문시 필수정보인 trigger_price 필드가 입력되지 않은 경우입니다.',
  'amount is required for MARKET(BUY) order':
    '시장가(매수) 주문시 필수정보인 총액필드가 입력되지 않은 경우입니다.',
  'Not Supported Order Type': '지원하지 않는 주문 타입입니다.',
  'trigger price and current price can not be same':
    '예약지정가 주문시 trigger_price에 입력하신 값이 해당 코인의 현재가와 동일한 경우입니다.',
  'Withdrawal quantity is not correct': '옳바르지 않은 출금 수량입니다.',
  'Invalid order information': '유효하지 않은 주문 정보입니다.',
  'Cannot register selling orders below the base price':
    '기본가 이하로는 매도 주문 등록 불가합니다.',
  'Cannot register selling orders above the base price':
    '기본가격 이상으로는 매도 주문 등록 불가합니다.',
  'Cannot register buying orders below the base price':
    '기본가격 이하로는 매수 주문 등록 불가합니다.',
  'Cannot register buying orders above the base price':
    '기본가격 이상으로는 매수 주문 등록 불가합니다.',
  'Invalid quantity': '잘못된 수량이 입력되었습니다.',
  'Cannot be process the orders below the minimum amount':
    '최소 수량 이하로는 주문이 불가합니다.',
  'Cannot be process the orders exceed the maximum amount':
    '최대 수량 이상으로는 주문이 불가합니다.',
  'Price is out of range': '주문 요청 시 입력한 가격이 범위를 벗어납니다.',
  'Qty is out of range': '주문 요청 시 입력한 수량이 범위를 벗어납니다.',
  'Unavailable price unit. Please check the Range unit API to get the price_unit':
    '가격 단위가 유효하지 않습니다. 가격 단위를 확인하려면 Range unit API를 확인하십시오.',
  'Unavailable qty unit. Please check the Market API to see the qty_unit':
    '수량 단위가 유효하지 않습니다. 수량 단위를 확인하려면 Market API를 확인하십시오.',
  'Duplicated user_order_id': '중복된 user_order_id',
  'user_order_id and order_Id cannot be requested together. Otherwise, neither was entered':
    'order_id와 user_order_id가 함께 요청되거나, 둘 다 입력되지 않았을 경우',
  'Invalid user_order_id (It must be lower case)':
    '잘못된 user_order_id (대문자 혹은 지원하지 않는 특문, 150자 초과)',
  'The API does not support a portfolio':
    '포트폴리오를 지원하지 않는 API입니다.',
  'Server error': '서버 에러가 발생했습니다.',
  'Invalid 2FA': '유효하지 않은 2-Factor 인증 값입니다.',
  'The V2 order API only supports limit order types':
    'V2의 특정 주문 조회 시(v2/order/query_order) 조회하려는 주문이 지정가 주문이 아닌 경우 발생합니다. (v2는 시장가, 예약 지정가를 지원하지 않아 발생하는 에러입니다.)',
  'This API is deprecated and only supports limit order type':
    'v2.1의 특정 주문 정보 조회 시(v2.1/order/info) 조회하려는 주문이 지정가 주문이 아닌 경우 발생합니다. (v2.1/order/info는 시장가, 예약 지정가를 지원하지 않아 발생하는 에러입니다.)',
  'User not found': '존재하지 않은 고객입니다.',
  'Withdrawal of the virtual asset has been suspended. Please check our notice':
    '가상자산의 출금이 일시적 혹은 영구적으로 중단되었습니다. 공지사항을 확인하십시오.',
  'Withdrawal is rejected': '출금이 특정 사유로 인해 거절되었습니다.',
  'Exceed daily withdrawal limit': '일일 출금 가능 수량을 초과했습니다.',
  'Failed by 24-hour withdrawal delay policy':
    '원화 입금으로 인한 24시간 출금지연 상태로 출금에 실패했습니다.',
  'Try again after complete phone verification':
    '휴대폰 번호 인증 완료한 후에 다시 시도하십시오.',
  'An error in the balance. Please contact CS center':
    '잔고에 오류가 발생했습니다. 고객 센터에 연락하십시오.',
  'Account was detected through FDS system monitoring':
    'FDS 시스템 모니터링을 통해 계정이 감지되었습니다.',
  'Account is locked':
    '계정이 잠겨 있어 출금이 불가능한 상태입니다. 계정 잠금 해제는 최신 버전의 앱 또는 웹페이지에서 로그인하여 진행할 수 있습니다.',
  'Withdrawal is restricted by master account':
    '마스터 계정이 서브 계정의 가상자산 출금을 제한한 상태입니다.',
}
