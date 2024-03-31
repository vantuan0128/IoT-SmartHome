import React from 'react';
import '../styles/profile.css';
import avatar from '../assets/img/avatar.jpg';
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";

const Profile = () => {
    return (
        <div className='container__profile'>
            <div className="container__greeting">
                <h1>Hello, I'm a student studying at PTIT !!!</h1>
            </div>
            <div className="container__details">
                <div className="about-me">
                    <p>"Hello, I'm Tuan, a student at PTIT specializing in Multimedia Technology
                        . Currently in my senior year, I am passionate about web developmment and aspire
                        to pursue opportunities in this field. Eager to apply my skills and knowledge, I am
                        excited about the prospect of engaging in web programming tasks and contributing to innovative
                        projects. Looking forward to exploring and expanding my expertise in the dynamic world of web development"
                    </p>
                </div>
                <div className="avatar">
                    <img src={avatar} alt="image" />
                </div>
                <div className="detail-info">
                    <h3>Detailed Information</h3>
                    <h4>My Full Name</h4>
                    <p>Nguyen Van Tuan</p>
                    <h4>Student's ID</h4>
                    <p>B20DCPT182</p>
                    <h4>Address</h4>
                    <p>Khuong Dinh, Thanh Xuan, Ha Noi</p>
                    <h4>Phone number</h4>
                    <p>0312312331</p>
                </div>
            </div>
            <div className="container__contacts">
                <h1>For more Information</h1>
                <div className="container__icons">
                    <a href="https://www.facebook.com/profile.php?id=100013398574278"><FaFacebook className='icon2' /></a>
                    <a href="https://www.instagram.com/_n.tuanz14/"><RiInstagramFill className='icon2' /></a>
                    <a href="https://www.tiktok.com/@_n.tuanz14_?is_from_webapp=1&sender_device=pc"><FaTiktok className='icon2' /></a>
                    <a href="https://www.youtube.com/channel/UCNusNN9WlBe8vz47y6sGABQ"><FaYoutube className='icon2' /></a>
                    <a href="https://github.com/vantuan0128"><FaGithub className='icon2' /></a>
                </div>
            </div>
            <div className="container__achievements">
                <h1>What have I achieved at PTIT ?</h1>
                <div className="detail-achievements">
                    <h3>- Degree: Multimedia Technology Engineer</h3>
                    <h3>- CGPA: 3.3/4.0</h3>
                    <h3>- Accumulated knowledge:</h3>
                    <p>+ Ngôn ngữ lập trình C/C++</p>
                    <p>+ Thiết kế web cơ bản</p>
                    <p>+ Thiết kế tương tác đa phương tiện</p>
                    <p>+ Cấu trúc dữ liệu và giải thuật</p>
                    <p>+ Kiến trúc máy tính và hệ điều hành</p>
                    <p>+ Ngôn ngữ lập trình Java</p>
                    <p>+ Cơ sở dữ liệu</p>
                    <p>+ Kỹ thuật đồ họa</p>
                    <p>+ Lập trình âm thanh</p>
                    <p>+ Lập trình mạng với C++</p>
                    <p>+ Nhập môn công nghệ phần mềm</p>
                    <p>+ Lập trình website</p>
                    <p>+ Thị giác máy tính</p>
                    <p>+ Xử lý ảnh và video</p>
                    <p>+ Lập trình ứng dụng đầu cuối trên di động</p>
                    <p>+ Lập trình game cơ bản</p>
                    <p>....</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;
