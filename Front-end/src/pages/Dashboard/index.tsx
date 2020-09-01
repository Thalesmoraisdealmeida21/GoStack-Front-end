import React, { useState, useCallback } from 'react';

import { Container,
  Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';

import 'react-day-picker/lib/style.css';

import logoImg from './../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from './../../hooks/AuthContext';


import DayPicker, {DayModifiers} from 'react-day-picker';


interface CalendarModifiers extends DayModifiers {
  available: boolean;
}


const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();


    const [ selectedDate, setSelectedDate] = useState( new Date());

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers)=>{
        if(modifiers.available) {
          setSelectedDate(day);
        }
    }, [])
    return (
      <Container>
        <Header>

        <HeaderContent>
          <img src={logoImg}></img>

          <Profile>
            <img src={user.avatar_url} alt={user.name}></img>
            <div>
              <span>Bem-Vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>


          <button type="button" onClick={signOut}>
            <FiPower size={25}></FiPower>
          </button>
        </HeaderContent>



        </Header>

        <Content>
          <Schedule>

            <h1>Horários Agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda Feira</span>
            </p>


            <NextAppointment>
                <strong>Atendimento a Seguir</strong>
                <div>
                  <img src="https://avatars2.githubusercontent.com/u/12722629?s=460&u=c3d3e1b1fccb1da4b9b7c906393a24d507adae36&v=4" alt="Thales Morais"/>


                  <strong>Thales Morais</strong>
                  <span>
                    <FiClock></FiClock>
                    08:00
                  </span>
                </div>
            </NextAppointment>

            <Section>
              <strong>Manhã</strong>

              <Appointment>
              <span> <FiClock></FiClock> 08:00</span>
              <div>
                  <img src="https://avatars2.githubusercontent.com/u/12722629?s=460&u=c3d3e1b1fccb1da4b9b7c906393a24d507adae36&v=4" alt="Thales Morais"/>
                  <strong>Thales Morais</strong>
              </div>
            </Appointment>

            <Appointment>
              <span> <FiClock></FiClock> 08:00</span>
              <div>
                  <img src="https://avatars2.githubusercontent.com/u/12722629?s=460&u=c3d3e1b1fccb1da4b9b7c906393a24d507adae36&v=4" alt="Thales Morais"/>
                  <strong>Carlos Silva</strong>
              </div>
            </Appointment>
            </Section>

            <Section>
              <strong>Tarde</strong>


              <Appointment>
              <span> <FiClock></FiClock> 08:00</span>
              <div>
                  <img src="https://avatars2.githubusercontent.com/u/12722629?s=460&u=c3d3e1b1fccb1da4b9b7c906393a24d507adae36&v=4" alt="Thales Morais"/>
                  <strong>Hanna Gonçalves</strong>
              </div>
            </Appointment>


            </Section>



          </Schedule>

          <Calendar>
            <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6]}]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5]}
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Maio',
              'Abril',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outrubro',
              'Novembro',
              'Dezembro '
            ]}

            ></DayPicker>
          </Calendar>
        </Content>
      </Container>
    )
}


export default Dashboard;
