import React from 'react';
import '../assets/styles/home.css'
import Header from '../components/Header';
import Banner from '../assets/images/bg-banner.png';
import Button from '../components/ui/Button';
import Diamond from '../assets/images/diamond.png';
import Contact from '../assets/images/contact.png';
import Event from '../assets/images/event.png';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
    <div className="banner">
      <img src={Banner} alt="" />
      <div className="banner-content">
        <h1 className="banner-content__title">Quản lý sự kiện thông minh, chuyên nghiệp và dễ dàng.</h1>
        <h2 className="banner-content__subtitle">HTML sẽ mang tới cho Quý khách hàng những trải nghiệm tốt đẹp và thoải mái nhất.<br/>
Chúng tôi hiểu được lợi ích của Quý khách chính là sự tồn tại của công ty.</h2>
        <Button title={'Bắt đầu'} type='button' color={'primary'} className='button-banner'/>
      </div>
    </div>
    <div className="event">
      <h1 className="event-title">Quản lý sự kiện HTML EVENT là ai ?</h1>
      <p className="event-description">Quản lý sự kiện HTML là công ty chuyên nghiệp trong lĩnh vực cung cấp phần mềm giúp khách hàng quản lý sự kiện với nhiều năm kinh nghiệm. Đội ngũ nhân viên của chúng tôi là những chuyên viên giỏi với nhiều năm kinh nghiệm trong lĩnh vực tổ chức sự kiện, quản lý, Marketing…và xây dựng thương hiệu. Khách hàng, đối tác của chúng tôi là những doanh nghiệp, tập đoàn lớn trong và ngoài nước. Công ty HTML EVENT đã trở thành đối tác đáng tin cậy của các doanh nghiệp.</p>
    </div>
    <div className="list-option">
      <div className="option-item flex">
        <img className="option-item__image" src={Diamond}/>
        <div className="option-item__if">
          <h2>20</h2>
          <p>Năm kinh nghiệm</p>
        </div>
      </div>
      <div className="option-item flex">
        <img className="option-item__image" src={Contact}/>
        <div className="option-item__if">
          <h2>1000</h2>
          <p>Khách hàng tin dùng</p>
        </div>
      </div>
      <div className="option-item flex">
        <img className="option-item__image" src={Event}/>
        <div className="option-item__if">
          <h2>5000</h2>
          <p>Sự kiện đã tổ chức</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home