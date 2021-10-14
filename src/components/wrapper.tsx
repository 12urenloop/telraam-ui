import React from 'react'
import {EditModal} from "./Modal";
import {Batons} from "./Batons";
import {Teams} from "./Teams";

import '../styles/wrapper.scss'

export const Wrapper = () => (
  <div className="main-wrapper">
    <Batons />
    <Teams />
    <EditModal />
  </div>
)