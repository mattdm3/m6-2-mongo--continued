import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import VisuallyHidden from '@reach/visually-hidden';
import seatImageSrc from '../assets/seat-available.svg';
import { getRowName, getSeatNum, encodeSeatId } from '../helpers';

import UnstyledButton from './UnstyledButton';
import { BookingContext } from './BookingContext';

const StyledTippy = styled(Tippy)`
  color: white; 
  background: #333333;
  padding: 0; 
  margin: 0;
  height: 55px;  
  border-radius: 5px; 
  font-weight: 700; 
`
const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(seatIndex);



  const seatId = encodeSeatId(rowIndex, seatIndex);

  //couldn't not style that tippy. 



  return (
    <StyledTippy content={`Row ${rowName}, Seat ${seatNum} – $${price}`}>
      <Wrapper
        disabled={status === 'unavailable'}
        onClick={() => {
          beginBookingProcess({ seatId, price });
        }}
      >
        <VisuallyHidden >
          Seat number {seatNum} in Row {rowName}
        </VisuallyHidden>
        <img src={seatImageSrc} alt='' style={{ width, height }} />
      </Wrapper>
    </StyledTippy>
  );
};

const Wrapper = styled(UnstyledButton)`
  position: relative;

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;
