import React from 'react';
import Vacancies from './containers/scenes/Vacancies';
import Auth from './containers/scenes/Auth';
import VacancyDetail from './containers/scenes/VacancyDetail';
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
  auth: (props: {type: 'signup' | 'signin'}):IScene  => ({
    key: `auth?type=${props.type}`,
    title: props.type == 'signup' ? 'Зарегистрироваться' : 'Войти',
    props,
    component: Auth
  })
}



export default scenes;