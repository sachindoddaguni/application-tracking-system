import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardModal from './CardModal';
import $ from 'jquery';
import Board from "../components/Board/Board";

function ApplicationTrackingPage(props) {
  return (
    <Board{...props}/>
  );
}

export default ApplicationTrackingPage