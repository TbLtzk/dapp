import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { ErrorHandler } from 'helpers';

import { setAliases, setAliasesLoading, setAliasEvents, setEventsLoading } from './reducer';

import { useAppSelector } from 'store';

import { getAccountAliasesInstance } from 'contracts/contract-instance';
import { getAliasEvents } from 'contracts/helpers/aliases-helper';

export function useAliases () {
  const dispatch = useDispatch();

  const aliases = useAppSelector(({ aliases }) => aliases.aliases);
  const isAliasesLoading = useAppSelector(({ aliases }) => aliases.isAliasesLoading);

  async function loadAliases (address: string) {
    try {
      dispatch(setAliasesLoading(true));
      const contract = await getAccountAliasesInstance();
      const aliases = await contract.getAliases(address.toLowerCase());
      dispatch(setAliases(aliases));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      dispatch(setAliases([]));
    } finally {
      dispatch(setAliasesLoading(false));
    }
  }

  async function setAlias ({ address, purpose }: { address: string; purpose: AliasPurpose }) {
    const contract = await getAccountAliasesInstance();
    return contract.setAlias(address.toLowerCase(), purpose);
  }

  async function reserveAlias (address: string) {
    const contract = await getAccountAliasesInstance();
    return contract.reserve(address.toLowerCase());
  }

  return {
    aliases,
    isAliasesLoading,
    loadAliases: useCallback(loadAliases, []),
    setAlias: useCallback(setAlias, []),
    reserveAlias: useCallback(reserveAlias, []),
  };
}

export function useAliasEvents () {
  const dispatch = useDispatch();
  const isEventsLoading = useAppSelector(({ aliases }) => aliases.isEventsLoading);
  const events = useAppSelector(({ aliases }) => aliases.events);

  async function loadAliasEvents () {
    try {
      dispatch(setEventsLoading(true));
      const events = await getAliasEvents();
      dispatch(setAliasEvents(events));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      dispatch(setAliasEvents([]));
    } finally {
      dispatch(setEventsLoading(false));
    }
  }

  return {
    events,
    isEventsLoading,
    loadAliasEvents: useCallback(loadAliasEvents, []),
  };
}
