import { useMutation, useQuery } from "@tanstack/react-query";
import CommonServices from "../httpsServices/commonServices";

export const useCurrentLocation = ({lng,lat}) => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: CommonServices.getCurrentLocation({lng,lat}),
  });
};
