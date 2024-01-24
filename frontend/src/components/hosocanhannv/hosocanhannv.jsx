import * as React from "react";
<>
  <meta charSet="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>Hồ sơ cá nhân</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C500%2C600%2C800"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Notable%3A400"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Inter%3A400%2C500%2C600%2C800"
  />
  <link rel="stylesheet" href="./styles/h-s-c-nhn copy.css" />
  <div className="h-s-c-nhn-hWD">
    <div className="top-navigation-Ptq">
      <div className="frame-8-KnV">
        <div className="social-media-HUR">
          <img className="fb-ys3" src="./assets/fb-ezR.png" />
          <img className="x-Kvu" src="./assets/x-PHX.png" />
          <img className="linkedin-gFf" src="./assets/linkedin-VK3.png" />
        </div>
        <div className="frame-6-2aR">
          <div className="contact-nJh">
            <div className="phone-99F">
              <img className="image-1-USR" src="./assets/image-1-8jo.png" />
              <p className="item-84-987-654-321-oDo">+84 987 654 321</p>
            </div>
            <div className="mail-VMX">
              <img className="image-2-FLh" src="./assets/image-2-CqT.png" />
              <p className="htmlgmailcom-Nw7">html@gmail.com</p>
            </div>
          </div>
          <div className="login-5Kj">
            <img className="image-3-1z5" src="./assets/image-3-pJ9.png" />
            <p className="user-name-Yz1">User name</p>
          </div>
        </div>
      </div>
    </div>
    <div className="frame-10-HAu">
      <p className="html-event-D4Z">HTML EVENT</p>
      <div className="auto-group-e94x-ui5">
        <div className="button-4L5">
          <a href="homenv.html" className="nav-link active">
            Home
          </a>
        </div>
        <div className="button-4L5">
          <a href="quanlysknv.html" className="nav-link active">
            Khách hàng
          </a>
        </div>
        <div className="s-kin-JkD">
          <div className="s-kin-87o">
            <a href="sukiennv.html" className="nav-link active">
              Sự kiện
            </a>
          </div>
        </div>
        <div className="button-YY5">Hồ sơ cá nhân</div>
      </div>
    </div>
    <p className="thng-tin-c-nhn-bWM">Thông tin cá nhân</p>
    <div className="auto-group-32aw-umw">
      <div className="auto-group-8y3v-dC9">
        <div className="frame-35-y17">
          <p className="h-v-tn-tds">Họ và tên</p>
          <p className="gii-tnh-dLZ">Giới tính</p>
          <p className="date-of-birth-NZ3">Date of birth</p>
          <p className="email-iso">Email</p>
          <p className="a-ch-4Rs">Địa chỉ</p>
        </div>
        <div className="auto-group-65p7-PDF">
          <div className="frame-36-9CR">
            <p className="tn-ng-nhp-fgZ">Tên đăng nhập</p>
            <p className="mt-khu-baD">Mật khẩu</p>
            <p className="s-in-thoi-8q3">Số điện thoại</p>
          </div>
          <div className="frame-31-5EV">
            <div className="auto-group-9beb-d17">
              <div className="auto-group-uyso-mND">
                <div className="auto-group-6gou-6QV">
                  <div className="frame-29-yz5">
                    <textarea
                      name=""
                      required="Nguyễn Văn A"
                      defaultValue={""}
                    />
                  </div>
                  <div className="frame-30-S6y">
                    <textarea
                      name="Địa điểm tổ chức"
                      required="Nam/Nữ"
                      defaultValue={""}
                    />
                  </div>
                  <div className="frame-31-g1K">
                    <input
                      type="date"
                      name="myDateTime"
                      defaultValue="2024-01-01"
                    />
                  </div>
                </div>
                <div className="frame-37-jEV">
                  <div className="frame-29-VDf">
                    <textarea
                      name=""
                      required="Nguyễn Văn A"
                      defaultValue={""}
                    />
                  </div>
                  <div className="frame-30-mBB">
                    <p className="item--sV7">
                      <textarea
                        name=""
                        required="Nguyễn Văn A"
                        defaultValue={""}
                      />
                    </p>
                    <img className="image-5-maV" src="./assets/image-5.png" />
                  </div>
                  <div className="foot-lnk thay-i-mt-khu-32D login-btn">
                    <label htmlFor="tab-1">Thay đổi mật khẩu</label>
                  </div>
                  <div className="frame-31-M2u">
                    <textarea
                      name=""
                      required="Nguyễn Văn A"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="frame-32-ya5">
                <textarea name="" required="Nguyễn Văn A" defaultValue={""} />
              </div>
            </div>
            <div className="frame-34-Rgy">
              <textarea name="" required="Nguyễn Văn A" defaultValue={""} />
            </div>
          </div>
        </div>
      </div>
      <div className="auto-group-mb7z-6o7">
        <div className="frame-38-Dsj">Lưu </div>
        <div className="frame-39-7TK">Hủy</div>
      </div>
    </div>
  </div>
  <div className="blur-bg-overlay" />
  <div className="form-popup">
    <span className="close-btn material-symbols-rounded">close</span>
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          defaultChecked=""
        />
        <label htmlFor="tab-1" className="tab">
          Đổi mật khẩu
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab" />
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="pass" className="label">
                Mật khẩu cũ
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Mật khẩu mới
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Xác nhận mật khẩu mới
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <input type="submit" className="button" defaultValue="Lưu" />
            </div>
            <div className="hr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</>
