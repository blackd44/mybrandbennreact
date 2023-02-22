import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Rotate1 from "../components/loaders/rotate1";

let server = process.env.REACT_APP_SERVER_URL;

const Contact = () => {
  const formRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const subRef = useRef();
  const errorRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      let button = subRef.current;
      setLoading((prev) => true);
      button.disabled = true;
      const message = {
        email: emailRef.current.value,
        content: messageRef.current.value,
      };
      axios
        .post(server + "/api/messages", message)
        .then((res) => {
          errorRef.current.innerText = "";
          formRef.current.reset()
          button.style.backgroundColor = "#0a0";
        })
        .catch((err) => {
          console.error(err);
          errorRef.current.innerText =
            err?.response?.data?.error || err?.message;
          button.style.backgroundColor = "#f00";
        });
      setLoading(false);
      setTimeout(() => {
        button.disabled = false;
        button.style.backgroundColor = "var(--active-color)";
      }, 2000);
    },
    [messageRef, emailRef]
  );

  useEffect(() => {
    const form = formRef.current;
    if (form && form !== null) {
      form.addEventListener("submit", sendMessage);
    }
    return () => {
      form.removeEventListener("submit", sendMessage);
    };
  }, [sendMessage]);

  return (
    <>
      <main>
        <section className="first contact">
          <div className="head1">
            <span>Let’s </span>
            <h1>Get In Touch</h1>
          </div>
          <div className="flex-between body">
            <div className="personal">
              <div>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.30917 13.4329C8.76917 18.2675 12.7325 22.2308 17.5671 24.6908L21.3254 20.9325C21.8038 20.4542 22.47 20.3175 23.0679 20.5054C24.9813 21.1375 27.0312 21.4792 29.1667 21.4792C29.6197 21.4792 30.0543 21.6592 30.3746 21.9795C30.695 22.2999 30.875 22.7344 30.875 23.1875V29.1667C30.875 29.6197 30.695 30.0543 30.3746 30.3746C30.0543 30.695 29.6197 30.875 29.1667 30.875C21.4643 30.875 14.0775 27.8153 8.63111 22.3689C3.18474 16.9225 0.125 9.53566 0.125 1.83333C0.125 1.38026 0.304985 0.945734 0.625359 0.625359C0.945734 0.304985 1.38026 0.125 1.83333 0.125H7.8125C8.26558 0.125 8.7001 0.304985 9.02047 0.625359C9.34085 0.945734 9.52083 1.38026 9.52083 1.83333C9.52083 3.96875 9.8625 6.01875 10.4946 7.93208C10.6825 8.53 10.5458 9.19625 10.0675 9.67458L6.30917 13.4329Z"
                    fill="#3A3A40"
                  />
                </svg>
                <p>Phone</p>
                <p>+250 791 808 623</p>

                <svg
                  width="35"
                  height="29"
                  viewBox="0 0 35 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.1667 7.66666L17.5 16.2083L3.83335 7.66666V4.24999L17.5 12.7917L31.1667 4.24999M31.1667 0.833328H3.83335C1.9371 0.833328 0.416687 2.35374 0.416687 4.24999V24.75C0.416687 25.6562 0.776656 26.5252 1.41741 27.1659C2.05815 27.8067 2.9272 28.1667 3.83335 28.1667H31.1667C32.0728 28.1667 32.9419 27.8067 33.5826 27.1659C34.2234 26.5252 34.5834 25.6562 34.5834 24.75V4.24999C34.5834 2.35374 33.0459 0.833328 31.1667 0.833328Z"
                    fill="#3A3A40"
                  />
                </svg>
                <p>Email</p>
                <p>irabd44@gmail.com</p>

                <svg
                  width="25"
                  height="35"
                  viewBox="0 0 25 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 16.6458C11.3673 16.6458 10.281 16.1959 9.48008 15.3949C8.67915 14.594 8.22919 13.5077 8.22919 12.375C8.22919 11.2423 8.67915 10.156 9.48008 9.35506C10.281 8.55413 11.3673 8.10416 12.5 8.10416C13.6327 8.10416 14.719 8.55413 15.52 9.35506C16.3209 10.156 16.7709 11.2423 16.7709 12.375C16.7709 12.9359 16.6604 13.4912 16.4458 14.0094C16.2311 14.5275 15.9165 14.9983 15.52 15.3949C15.1234 15.7915 14.6526 16.1061 14.1344 16.3207C13.6162 16.5354 13.0609 16.6458 12.5 16.6458ZM12.5 0.416664C9.32847 0.416664 6.28682 1.67656 4.0442 3.91918C1.80158 6.1618 0.541687 9.20345 0.541687 12.375C0.541687 21.3437 12.5 34.5833 12.5 34.5833C12.5 34.5833 24.4584 21.3437 24.4584 12.375C24.4584 9.20345 23.1985 6.1618 20.9558 3.91918C18.7132 1.67656 15.6716 0.416664 12.5 0.416664Z"
                    fill="#3A3A40"
                  />
                </svg>
                <p>Address</p>
                <address>KK 707 Street, kigali, Rwanda</address>
              </div>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4112.075631471044!2d30.07543462252798!3d-1.9670370106184025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6707ebc3b59%3A0xe66db5a01da79fbb!2sKK%20707%20St%2C%20Kigali!5e1!3m2!1sen!2srw!4v1670366583090!5m2!1sen!2srw"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <form className="message" ref={formRef}>
              <label>
                <span>
                  <svg
                    width="28"
                    height="22"
                    viewBox="0 0 28 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6666 5.66666L14 12.3333L3.33329 5.66666V2.99999L14 9.66666L24.6666 2.99999M24.6666 0.333328H3.33329C1.85329 0.333328 0.666626 1.51999 0.666626 2.99999V19C0.666626 19.7072 0.947577 20.3855 1.44767 20.8856C1.94777 21.3857 2.62605 21.6667 3.33329 21.6667H24.6666C25.3739 21.6667 26.0521 21.3857 26.5522 20.8856C27.0523 20.3855 27.3333 19.7072 27.3333 19V2.99999C27.3333 1.51999 26.1333 0.333328 24.6666 0.333328Z"
                      fill="#3A3A40"
                    />
                  </svg>
                  <span>Email</span>
                </span>
                <input type="email" name="email" required ref={emailRef} />
              </label>
              <label>
                <span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6666 0.666667H3.33329C2.62605 0.666667 1.94777 0.947618 1.44767 1.44771C0.947577 1.94781 0.666626 2.62609 0.666626 3.33333V27.3333L5.99996 22H24.6666C25.3739 22 26.0521 21.719 26.5522 21.219C27.0523 20.7189 27.3333 20.0406 27.3333 19.3333V3.33333C27.3333 1.85333 26.1333 0.666667 24.6666 0.666667Z"
                      fill="#3A3A40"
                    />
                  </svg>
                  <span>Message</span>
                  <span
                    style={{
                      color: "red",
                      fontSize: "60%",
                      marginLeft: "auto",
                    }}
                    name="info"
                  ></span>
                </span>
                <textarea ref={messageRef}></textarea>
              </label>
              <button className="" type="submit" required ref={subRef}>
                {isLoading ? (
                  <>
                    <Rotate1 height={"20px"} />
                  </>
                ) : (
                  <>Send</>
                )}
              </button>
              <p
                style={{ color: "red", marginBlock: "1rem" }}
                ref={errorRef}
              ></p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
