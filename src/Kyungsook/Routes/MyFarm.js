import React from 'react' ;
import '../Css/MyFarm.css';

const MyFarm = () => {
    return (
        <>
            <div className="container">
                <div className = "section">
                    <div className="item item1">bar</div>
                    {/* 배지 사진 + 온,습도 */}
                    <div className="item item2">
                        <div className =""></div>
                        <div className =""></div>
                    </div>
                    {/* end 배지 사진 + 온,습도 */}
                    <div className="item item3">item2</div>
                </div>
            </div>
        </>
    );
};

export default MyFarm ;
