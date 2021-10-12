import React from 'react'
import {Batons} from "./batons";
import {BatonModal} from "./batonModal";
import {Teams} from "./Teams";
import {TeamModal} from "./teamModal";

import '../styles/wrapper.scss'

export const Wrapper = () => (
  <div className="main-wrapper">
    <Batons />
    <Teams />
    <BatonModal />
    <TeamModal />
  </div>
)