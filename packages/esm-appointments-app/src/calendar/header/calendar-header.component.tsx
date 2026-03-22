import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button, ContentSwitcher, Switch } from '@carbon/react';
import { ArrowLeft } from '@carbon/react/icons';
import { navigate } from '@openmrs/esm-framework';
import { spaHomePage } from '../../constants';
import { useSelectedDate } from '../../hooks/useSelectedDate';
import styles from './calendar-header.scss';

type CalendarView = 'monthly' | 'weekly' | 'daily';

interface CalendarHeaderProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentView, onViewChange }) => {
  const { t } = useTranslation();
  const selectedDate = useSelectedDate();

  const handleClick = () => {
    navigate({ to: `${spaHomePage}/appointments/${dayjs(selectedDate).format('YYYY-MM-DD')}` });
  };

  const views: Array<{ key: CalendarView; label: string }> = [
    { key: 'monthly', label: t('monthly', 'Monthly') },
    { key: 'weekly', label: t('weekly', 'Weekly') },
    { key: 'daily', label: t('daily', 'Daily') },
  ];

  return (
    <div className={styles.calendarHeaderContainer}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.backButton}
          iconDescription={t('back', 'Back')}
          kind="ghost"
          onClick={handleClick}
          renderIcon={ArrowLeft}
          size="lg">
          <span>{t('back', 'Back')}</span>
        </Button>
      </div>
      <ContentSwitcher
        selectedIndex={views.findIndex((v) => v.key === currentView)}
        onChange={({ name }) => onViewChange(name as CalendarView)}>
        {views.map(({ key, label }) => (
          <Switch key={key} name={key} text={label} />
        ))}
      </ContentSwitcher>
    </div>
  );
};

export default CalendarHeader;
