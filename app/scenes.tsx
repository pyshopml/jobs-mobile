import React from 'react';
import Vacancies from './containers/scenes/Vacancies';
import VacancyDetail from './containers/scenes/VacancyDetail';
import VacancyCreation from './containers/scenes/VacancyCreation';

import IScene from "./types/scene.interface";

const scenes = {
  vacancies: (props?):IScene  => ({
    key: 'vacancies',
    title: 'Вакансии',
    props,
    component: Vacancies
  }),
  vacancyDetail: (props: {postId: number}, title?: string):IScene  => ({
    key: `vacancyDetail?id=${props.postId}`,
    title: title || 'Вакансия',
    props,
    component: VacancyDetail
  }),
  vacancyCreation: (props?):IScene  => ({
    key: 'vacancyCreation',
    title: 'Новая вакансия',
    props,
    component: VacancyCreation
  }),
}



export default scenes;