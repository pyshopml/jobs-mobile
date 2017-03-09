import React from 'react';
import Vacancies from './containers/scenes/Vacancies';
import VacancyDetail from './containers/scenes/VacancyDetail';
import IScene from "./types/scene.interface";

const scenes = {
  vacancies: (props?):IScene  => ({
    key: 'vacancies',
    title: 'Вакансии',
    props,
    component: Vacancies
  }),
}



export default scenes;