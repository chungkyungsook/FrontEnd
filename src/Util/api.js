export const AWS_URL = 'http://184.73.45.24'

//////////////////////////////////////////////////버섯 재배기 정보 API
//해당 버섯 재배기의 번호와 진행중인 프로젝트 이름 
// id : 프로그램 ID 
// prg_name : 프로그램 이름	
//param
export const PRG_NAME = '/api/myfarm/data'

// 해당 계정의 기기목록을 가져옴
export const MACHINE_LIST = '/api/myfarm/list'

//재배기 가동 상태
//token
//200, 4040
export const MACHINE_STATUS = '/api/myfarm/status'

//프로그램 시작날짜
//get param
//200 404
//get id : 프로그램 id
export const DATE = '/api/farm/startdate'

//사용자가 실행중인 재배기 id 
//get ,param
//userId 
//200,404
export const MACHINE_ID = '/api/myfarm/id'

//////////////////////////////////////////////////버섯의 상태 정보 API
//해당 프로그램의 모든 버섯 정보들을 가져옴
//prgId
//해당 프로그램의 모든 버섯 정보들을 가져옴
//prgId
///api/mushroom/{type}
export const MUSHROOM_ALL = '/api/mushroom'

//배지 이름 가져오기
//id : 프로그램id
//param 200 4004
export const MUSHROOM_NAME = '/api/farm/compostname'

//배지 이름 변경하기
//id : (int) 유저 id, name : (string)이름
//json 200	403
export const MUSHROOM_NAME_CHANGE = '/api/farm/compostname'

// 기기 key 번호 확인
// get, pin: int
export const MUCHIN_KYE = '/api/pin/check'

// 기기 pwd 번호 확인
// get, pin:int pw : string
export const MUCHIN_PWD = '/api/pin/auth'
//기기 등록하기, 저장
//PUT
export const MUCHIN_MAKE_DEVICE = '/api/myfarm/register'
//기기 사용
//PUT
export const MUCHIN_SETTING = '/api/myfarm/select'
//기기 삭제
//delete
export const MUCHIN_DELETE = '/api/myfarm'


/////////////////////////////////////////////////로그인 관련된 API
//회원가입
//post ,json
//userId, email
//200, 403
export const REGISTER = '/api/register'

//로그인
//post ,json
//token, userId
//200, 401
export const LOGIN = '/api/login'

//로그아웃
//post,json
//token
//200, 404
export const LOGOUT = '/api/logout'

//3D ply 파일 가져오기
export const PLY = '/api/ply'

//사진 가져오기
// export const IMG_COMPOST = '/api/compost'
export const IMG_COMPOST = '/api/img'


//모든 배지 사진 가져오기
export const COMPOST_CLUSTER = '/api/compost/image/cluster'

// farm 페이지에 필요한 api 

// 선택된 버섯의 현재까지의 이미지를 가져온다. 
// get -> id : 버섯 번호 
export const MUSHROOM_IMG_HISTROY = '/api/img/history'

// 실시간 배지 이미지를 각도별로 4개 획득
// 파라미터 : 대상 기기 아이디 int -> id 
// id : 이미지 번호
// machineid : 대상 기기 id
// rotation 촬영한 각도
// data : 저장한 시간 
export const  MUSHROOM_CLUSTER =  '/api/cluster/compost'

// 지정한 각도에 해당하는 버섯들을 가져온다.
export const MUSHROOM_ROTATION = '/api/rotation/mushroom'

// 실시간 배지 이미지 파일을 가져온다. 
export const MUSHROOM_REALTIME = '/api/realtime/compost'




