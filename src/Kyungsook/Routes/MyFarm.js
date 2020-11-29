import React from 'react' ;
import '../Css/MyFarm.css';

const MyFarm = () => {
    return (
        <div className="container">

            <div className="item item1">
                <div className = "item1Text"> 기기 관리</div>
                <div className = "item1ButtonBox">
                    <div className = "item1Button">키노코</div>
                    <div className = "item1Button">키노코 프로젝트입니다.</div>
                    <div className = "item1Button">+</div>
                </div>
            </div>

            {/* 배지 사진 + 온,습도 */}
            <div className="item item2">
                <div className = "box1 kinokoImgBox">
                    <input className = "kinokoName" />
                    <div className = "kinokoImg"> 버섯 사진 영역</div>
                    <div className = "kinokoBtn"> 앞 </div>
                </div>
                <div className = "box1 environment">
                    <div className = "box2 temperature">온도</div>       
                    <div className = "box2 humidity">습도</div>       
                </div>
            </div>

            <div className="item item3">
                <div className = "graph">그래프 구역</div>
                <div className = "notification">
                    <div className = "programName">진행중인 프로그램 이름</div>
                    <div className = "smailInfo">간략한 상태 정보</div>
                </div>
                <div className="pageInfo">상세 페이지</div>
            </div>
        </div>
    );
};

export default MyFarm ;
