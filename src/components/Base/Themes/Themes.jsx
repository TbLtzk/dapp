import React from 'react';
import { ThemesWrp } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setThem } from 'store/actions/action-creaters/theme';
import { THEMES } from 'constants/colors';
import { theme } from 'store/selectors/theme';

function Themes() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(theme);

  function changeThemes() {
    if (currentTheme === THEMES.light) {
      dispatch(setThem(THEMES.dark));
    } else {
      dispatch(setThem(THEMES.light));
    }
  }

  return (
    <ThemesWrp curenttheme={currentTheme} onClick={changeThemes}/>
  );
}

export default Themes;
