import React from 'react';

const date = [
  {
    class: '1',
    state: 'Wish list',
    wordOfDate: 'Apply By',
  },
  {
    class: '2',
    state: 'Waiting for referral',
    wordOfDate: 'Referral before ',
  },
  {
    class: '3',
    state: 'Applied',
    wordOfDate: 'Applied Date',
  },
  {
    class: '4',
    state: 'Rejected',
    wordOfDate: 'Applied Date',
  },
];

const Card = ({ application, showEditModal }) => {
  const dateType = date.find((d) => d.class === application.status);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='card card-col' key={application.id + '_card'} onClick={showEditModal}>
      <div className='card-body'>
        <div className='card-action'>
          <h6 className='card-title' onClick={stopPropagation}>
            {application.jobTitle}
          </h6>
        </div>
        <p className='small-content-text' key={application.companyName}>
          {application.companyName}
          <br />
          {dateType.wordOfDate}: {application.date}
        </p>
        <p>
          Job link:{' '}
          <a href={application.jobLink} target='_blank' rel='noreferrer' onClick={(event) => event.stopPropagation()}>
            {application.jobLink}
          </a>
        </p>
        <p>Location: {application.location}</p>
      </div>
    </div>
  );
};

export default Card;
