import React from 'react' ;
import '../Css/MyFarm.css';

const MyFarm = () => {
    return (
        <div className="container">
            <div className="item item1">
                <div className = "item1Text"> 기기 관리</div>
                <div className = "item1ButtonBox">
                    <div className = "item1Button"></div>
                </div>
            </div>
            {/* 배지 사진 + 온,습도 */}
            <div className="item item2">
                <div className = "box1 img">

                </div>
                <div className = "box1 environment">

                </div>
            </div>
            <div className="item item3">

                <div className = "graph">그래프</div>
                <div className = "notification">프로그램</div>
            </div>
        </div>
    );
};

export default MyFarm ;
