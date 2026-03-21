import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      const data = await actor.getLeaderboard();
      return [...data].sort((a, b) => Number(b.gameLevel - a.gameLevel));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useChatMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["chatMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatMessages();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAnnouncements();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useTournaments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTournaments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useComplaints() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getComplaints();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterPlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      username: string;
      userId: string;
      gameLevel: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerPlayer(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useSendChatMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sender, content }: { sender: string; content: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendChatMessage(sender, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    },
  });
}

export function usePostAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      body,
      author,
    }: { title: string; body: string; author: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postAnnouncement(title, body, author);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useRegisterTournament() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entry: {
      playerId: string;
      gameLevel: bigint;
      playerName: string;
      paymentNote: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerTournament(entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
  });
}

export function useSendComplaint() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      username,
      message,
    }: { username: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendComplaint(username, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
}
