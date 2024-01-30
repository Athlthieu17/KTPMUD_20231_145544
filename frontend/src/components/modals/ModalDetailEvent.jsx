import React from 'react';
import "./modalDetailEvent.css"
import TextField from '../ui/TextField';
import Button from '../ui/Button';

function ModalDetailEvent({isOpen, onClose, ...other}) {

  return (
    <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            <div className="modal-content">
                <div className="name-event">
                    <h1>Sự kiện số 1</h1>
                </div>
                <div className="card-modal">
                    <div className="card-modal__item">
                        <img className="card-modal__img" alt="" src={other?.thumbnail} />
                        <div className="card-detail card-address">
                            <TextField title={'Địa điểm tổ chức'} value={'Số 1 Đại Cồ Việt'} disable onChange={()=>{}}/>
                            <TextField title={'Ghi chú'} value={'abc'} onChange={()=>{}}/>
                        </div>
                    </div>
                    <div className="card-detail card-modal__item flex" style={{gap:'40px', alignItems:'flex-start'}}>
                        <div className="event-item">
                        <TextField title={'Chủ sở hữu'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Ngày bắt đầu'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Số người tham dự'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Phí phạt (VND)'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Số dư nợ (VND)'} value={'a'} onChange={()=>{}}/>
                        </div>
                        <div className="event-item">
                        <TextField title={'Mã sự kiện'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Ngày kết thúc'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Tổng chi phí (VND)'} value={'a'} onChange={()=>{}}/>
                    <TextField title={'Đã thanh toán (VND)'} value={'a'} onChange={()=>{}}/>
                    
                        </div>
                        
                    </div>
                </div>
                <div className="list-button flex">
                            <Button title={'Cancel'} 
                            styles={{
                            backgroundColor: 'red',
                            color: '#fff'
                            }}
                             type={'button'}/>
                            <Button title={'Save'} type={'button'}
                            styles={{
                                backgroundColor: '#409FC8',
                                color: '#fff'
                                }}
                            />
                        </div>
            </div>
          </div>
    </div>
  )
}

export default ModalDetailEvent