import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useAppointmentsCalendar } from '../hooks/useAppointmentsCalendar';
import AppointmentsHeader from '../header/appointments-header.component';
import CalendarHeader from './header/calendar-header.component';
import MonthlyCalendarView from './monthly/monthly-calendar-view.component';
import { useSelectedDate } from '../hooks/useSelectedDate';

type CalendarView = 'monthly' | 'weekly' | 'daily';

const AppointmentsCalendarView: React.FC = () => {
  const { t } = useTranslation();
  const selectedDate = useSelectedDate();
  const [currentView, setCurrentView] = useState<CalendarView>('monthly');
  const [selectedAppointmentUuid, setSelectedAppointmentUuid] = useState<string | null>(null);

  const { calendarEvents } = useAppointmentsCalendar(dayjs(selectedDate).toISOString(), currentView);

  return (
    <div data-testid="appointments-calendar">
      <AppointmentsHeader title={t('calendar', 'Calendar')} />
      <CalendarHeader currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'monthly' && (
        <MonthlyCalendarView events={calendarEvents} onAppointmentClick={setSelectedAppointmentUuid} />
      )}
    </div>
  );
};

export default AppointmentsCalendarView;
