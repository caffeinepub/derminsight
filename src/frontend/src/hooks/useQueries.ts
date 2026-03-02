import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import type { ConsultationIntake, ServicePlan } from "../backend.d";
import { useActor } from "./useActor";

export function useServicePlans() {
  const { actor, isFetching } = useActor();
  return useQuery<ServicePlan[]>({
    queryKey: ["servicePlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicePlans();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useListIntakes() {
  const { actor, isFetching } = useActor();
  return useQuery<ConsultationIntake[]>({
    queryKey: ["intakes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listIntakes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetIntakeById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ConsultationIntake | null>({
    queryKey: ["intake", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getIntakeById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export interface SubmitIntakeParams {
  name: string;
  email: string;
  skinConcerns: string[];
  skinType: string;
  currentRoutine: string;
  goals: string;
  photos: File[];
  consentGiven: boolean;
}

export function useSubmitIntake() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<string, Error, SubmitIntakeParams>({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Not connected");

      const photoBlobs: ExternalBlob[] = await Promise.all(
        params.photos.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const uint8 = new Uint8Array(buffer);
          return ExternalBlob.fromBytes(uint8);
        }),
      );

      return actor.submitIntake(
        params.name,
        params.email,
        params.skinConcerns,
        params.skinType,
        params.currentRoutine,
        params.goals,
        photoBlobs,
        params.consentGiven,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intakes"] });
    },
  });
}
