import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "@/constants/breackpoints";
import { transientOptions } from "@utils";

export const WrapperBoxSteps = styled(Box, transientOptions)`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  position: relative;
  width: 100%;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: 1fr;
    padding-left: 20px;
  }
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    padding-right: 0px;
  }
`;
export const StepsBox = styled(Box, transientOptions)<{ $completed?: boolean }>`
  margin-right: 20px;
  position: relative;
  min-height: 107px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:after {
    position: absolute;
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    bottom: 4px;
    background-color: ${({ $completed }) =>
      $completed ? "#69b6d5" : "#718096"};
  }

  &:before {
    display: block;
    width: 100%;
    content: '';
    position: absolute;
    bottom: 10px;
    right: -18px;
    border-bottom: ${({ $completed }) =>
      $completed ? "3px solid #69b6d5" : "3px solid #718096"};
  }

  @media (max-width: ${MEDIA_QUERY_MD}px) {
    margin-right: 15px;
    justify-content: flex-start;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-right: 0px;
    min-height: 100px;
    &:before {
      width: 90px;
      transform: rotate(90deg);
      left: -8px;
      bottom: 0px;
      top: -8px;
    }

    &:after {
      position: relative;
      top: 37px;
      left: -22px;
    }
  }
}
`;
export const StepsDescrTitle = styled(Typography, transientOptions)<{
  $completed?: boolean;
}>`
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  color: ${({ $completed }) => ($completed ? "#F5F5F5" : "#718096")};
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    font-size: 14px;
  }
`;
export const StepsDescrSubTitle = styled(Typography, transientOptions)<{
  $completed?: boolean;
}>`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ $completed }) => ($completed ? "#CBD5E0" : "#718096")};
  margin-bottom: 25px;
  @media (max-width: ${MEDIA_QUERY_MD}px) {
    font-size: 14px;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-bottom: 0px;
  }
`;
