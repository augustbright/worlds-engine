import { useSelector } from "react-redux";
import { selectIsApplicationReady } from "state/selectors/common";

export const useIsAppReady = () => useSelector(selectIsApplicationReady);
