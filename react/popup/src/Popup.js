import './Popup.css';
import React, { useState, useEffect } from 'react';

/* Images */
import PopupImage from './Assets/images/popup-image.png';
import LogoPopup from './Assets/images/logo-popup.png';
import CloseIcon from './Assets/icons/close-icon.svg';

const Popup = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      firstName: nome,
      isNewsletterOptIn: true,
    }),
  };

  useEffect(() => {
    const overlayClass = 'popup-overlay';
    const popupElement = document.getElementsByClassName(overlayClass);
    if (popupElement.length > 0) {
      popupElement[0].style.display = localStorage.getItem('popup') ? 'none' : 'flex';
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem('popup', true);
    const overlayClass = 'popup-overlay';
    const popup = document.getElementsByClassName(overlayClass);
    if (popup.length > 0) {
      popup[0].style.display = 'none';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkbox = document.getElementById('termos_de_contrato');

    if (nome !== '' && email !== '' && checkbox.checked) {
      const res = await fetch(`/api/dataentities/CL/documents`, requestOptions);
      const data = await res.json();

      if (data) {
        setEmail('');
        setNome('');
        const textPopupClass = 'rich-text-0-x-paragraph--popup_text_main';
        const textCenterClass = 'rich-text-0-x-container--popup_title_main';
        const titlePopupClass = 'rich-text-0-x-paragraph--popup_title_main';
        const formClass = 'form-container-popup';

        const textPopup = document.getElementsByClassName(textPopupClass);
        const textCenter = document.getElementsByClassName(textCenterClass);
        const titlePopup = document.getElementsByClassName(titlePopupClass);
        const form = document.getElementsByClassName(formClass);

        if (textPopup.length > 0 && textCenter.length > 0 && titlePopup.length > 0 && form.length > 0) {
          form[0].style.display = 'none';
          titlePopup[0].innerText = 'Cadastro Efetuado com Sucesso';
          textCenter[0].style.textAlign = 'center';
          textPopup[0].style.display = 'none';
        }
      }
    }
  };

  return (
    <div className='popup-overlay' style={{ display: 'none' }}>
      <div className='popup-container'>
        <div className='popup-image'>
          <img src={PopupImage} alt='popup' className='popup-image' />
        </div>

        <div className='popup-info'>
          <img src={LogoPopup} alt='logo popup' className='popup-logo' />

          <div className='popup-title'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>

          <div className='popup-text'>
            Donec nunc ipsum, rhoncus nec lacus venenatis, tincidunt faucibus orci. Vestibulum congue lobortis vulputate.
          </div>

          <div className='form-container-popup'>
            <form onSubmit={handleSubmit} className='form-popup'>
              <input
                type='text'
                className='popup-input'
                required
                placeholder='Seu nome'
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <input
                type='email'
                className='popup-input'
                required
                placeholder='Seu e-mail'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <button className='button-assign' type='submit'>
                Assinar
              </button>
              <div className='popup-checkbox'>
                <input
                  type='checkbox'
                  required
                  className='popup-checkbox-input'
                  id='termos_de_contrato'
                ></input>
                <p className='popup-checkbox-text'>
                  Ao assinar, você concorda com a nossa Política de Privacidade.
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='close-popup' onClick={closePopup}>
          <img src={CloseIcon} width={16} height={16} alt='close popup' />
        </div>
      </div>
    </div>
  );
};

export default Popup;