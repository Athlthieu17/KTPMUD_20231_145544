import React from 'react'
import "./header.css"
import SelectField from "../ui/SelectField";
import { listOptionsSelect } from "../../utils";
import Button from '../ui/Button';
import { useState } from 'react';
import { STATUS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function MenuAction() {

    const [option, setOption] = useState(STATUS.ALL);
    const navigate = useNavigate();

  return (
    <div className="flex section">
            <div className="section-item flex" style={{gap : '20px'}}>
              <Button
                title={"Trang chủ"}
                type={"button"}
                styles={{ borderRadius: '5px', backgroundColor: '#fff' }}
                onClick={() => navigate('/',{replace: true})}
              />
              <SelectField options={listOptionsSelect} value={option} onChange={(e)=> setOption(e.target.value)}/>
            </div>
            <div className="section-item">
              <Button
                title={"Hồ sơ cá nhân"}
                styles={{ borderRadius: '5px', backgroundColor: '#fff' }}
                type={"button"}
                onClick={() => navigate('/profile',{replace: true})}
              />
            </div>
          </div>
  )
}

export default MenuAction