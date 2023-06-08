import { useEffect, useState } from 'react';
import './CallItem.scss';
import { ReactComponent as CallIcon1 } from './icons/Vector.svg';
import { ReactComponent as CallIcon2 } from './icons/Vector-1.svg';
import { ReactComponent as CallIcon3 } from './icons/Vector-2.svg';

export const CallItem = ({ call }) => {
  const [audioUrl, setAudioUrl] = useState('');
  const [record, setRecord] = useState();
  const [recordId, setRecordId] = useState();
  const [partnershipId, setPartnershipId] = useState();
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  const callType = (calling) => {
    switch (calling) {
      case 1:
        return <CallIcon1 />;
      case 0:
        return <CallIcon2 />;
      case '':
        return <CallIcon3 />;

      default:
        break;
    }
  };

  const dateTime = call?.date
    .split(' ')
    .pop()
    .split(':')
    .splice(0, 2)
    .join(':');

  const phone = call?.partner_data?.phone;
  const formattedPhone = `+7 (${phone.slice(1, 4)}) ${phone.slice(
    4,
    7
  )}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;

  const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    const handlePlayAudio = async () => {
      const requestOptions = {
        headers: {
          'Content-type':
            'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': 'filename="record.mp3"',
          Authorization: 'Bearer testtoken',
        },
        method: 'POST',
      };

      try {
        if (recordId && partnershipId) {
          const urls = `https://api.skilla.ru/mango/getRecord?record=${recordId}&partnership_id=${partnershipId}`;
          const response = await fetch(urls, requestOptions);
          if (!response.ok) {
            throw new Error(`${response.status} = ${response.statusText}`);
          }

          const blob = new Blob([await response.arrayBuffer()], {
            type: 'audio/mp3',
          });
          const url = window.URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    handlePlayAudio();
  }, [partnershipId, recordId]);

  return (
    <>
      <div
        className="call_item"
        onMouseOver={() => {
          setPartnershipId(call?.partnership_id);
          setRecordId(call?.record);
          // handlePlayAudio();
          setVisible(true);
        }}
        onMouseOut={() => setVisible(false)}
      >
        {' '}
        <span className="call_item__data_check"></span>
        <span className="call_item__data">{callType(call?.in_out)}</span>
        <span className="call_item__data">{dateTime}</span>
        <span className="call_item__data">
          <img src={call?.person_avatar} alt="" />
        </span>
        <span className="call_item__data">{formattedPhone}</span>
        <span className="call_item__data call_item__data_grey">
          {call?.source}
        </span>
        <span
          className={
            call?.status === 'Дозвонился'
              ? 'call_item__data call_item__success'
              : 'call_item__data call_item__fail'
          }
        >
          {call?.status}
        </span>
        <span className="call_item__data call_item__audio">
          {call?.record && (
            <audio
              className={
                visible ? 'call_item__player visible' : 'call_item__player'
              }
              src={audioUrl}
              controls
            ></audio>
          )}
          {convertSecondsToMinutes(call?.time)}
        </span>
      </div>
    </>
  );
};

// useEffect(() => {
//   // const { recordId, partnershipId } = props;
//   if (recordId && partnershipId) {
//     api.getRecord(recordId, partnershipId).then((data) => {
//       const newAudio = new Audio(data); // создаем новый объект Audio с URL аудиофайла
//       setAudio(newAudio); // обновляем состояние компонента
//     });
//   }
// }, [recordId, partnershipId]);

// const handlePlayAudio = async () => {
//   const requestOptions = {
//     headers: {
//       'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
//       'Content-Transfer-Encoding': 'binary',
//       'Content-Disposition': 'filename="record.mp3"',
//       Authorization: 'Bearer testtoken',
//     },
//     method: 'POST',
//   };

//   try {
//     if ((recordId, partnershipId)) {
//       const urls = `https://api.skilla.ru/mango/getRecord?record=${recordId}&partnership_id=${partnershipId}`;
//       const response = await fetch(urls, requestOptions);
//       if (!response.ok) {
//         throw new Error(`${response.status} = ${response.statusText}`);
//       }

//       const blob = new Blob([await response.arrayBuffer()], {
//         type: 'audio/mp3',
//       });
//       const url = window.URL.createObjectURL(blob);
//       var audio = new Audio(url);
//       audio.play();
//       console.log({ audio });
//     }
//   } catch (error) {
//     setError(error.message);
//   }
// };
