import ReactIcon from "webj2ee-icons-react";

export function setTwoToneColor(primaryColor) {
  return ReactIcon.setTwoToneColors({
    primaryColor
  });
}

export function getTwoToneColor() {
  const colors = ReactIcon.getTwoToneColors();
  return colors.primaryColor;
}
