import {FC} from 'react'
import {StepsBox, StepsDescrSubTitle, StepsDescrTitle, WrapperBoxSteps} from "./styled";

type Schedule = {
  [key: string]: unknown;
}
type TournamentStepperProps = {
  schedule?: Schedule[]
}

type StepType = {
  title: string;
  descr: string;
  completed: boolean;
  id: number;
};

const getFormattedTime = (timeString: string | undefined): string => {
  if (!timeString) return '';
  const time = new Date(timeString);
  return time.toLocaleString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).slice(0, 17);
};

export const TournamentStepper: FC<TournamentStepperProps> = ({schedule}) => {

  const steps: StepType[] = schedule?.reduce((acc, item, index) => {
    const [[title, timeString]] = Object.entries(item);
    const time = new Date(timeString as string);
    return [
      ...acc,
      {
        title,
        descr: getFormattedTime(timeString as string),
        completed: Date.now() - time.getTime() > 0,
        id: index,
      },
    ];
  }, [] as StepType[]) || [];
  console.log(steps)

  return (
    <WrapperBoxSteps>
      {steps.map(({title, descr, completed, id}) => (
        <StepsBox $completed={completed} key={id}>
          <StepsDescrTitle $completed={completed} variant="h5">{title}</StepsDescrTitle>
          <StepsDescrSubTitle $completed={completed} variant="h6">{descr}</StepsDescrSubTitle>
        </StepsBox>
      ))}
    </WrapperBoxSteps>
  );
};
