"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { useListDetails } from "@/app/providers/ListDetailsProvider";
import { User } from "@/app/types/user";
import { ParticipantsLetters } from "@/app/components/participantsLetters";
import { getRandomColor } from "@/app/utils/colors";
import { getParticipantsFirstLetters } from "@/app/utils/users";
import { Item } from "@/app/types/item";
import { ItemCard } from "@/app/components/itemCard";
import { Popover, PopoverHandle } from "@/app/components/popover";
import { useRef } from "react";
import { PopoverTypes } from "@/app/utils/popoverTypes";
import { EmptyItemDashboard } from "@/app/components/emptyItemsDashboard";

export default function ListDetails() {
  const { data, isLoading } = useListDetails();
  const { user } = useAuth();
  const popoverRef = useRef<PopoverHandle>(null);

  if (isLoading) {
    return "Carregando...";
  }

  return (
    <>
      <div>
        <div className="overflow-x-auto mb-6">
          {data?.participants.map((participant: User) => {
            const participantColor = getRandomColor();
            return (
              <div
                className="size-8"
                key={participant.uid}
                onClick={() =>
                  popoverRef.current?.open({
                    participant,
                    participantColor,
                    listId: data.id,
                  })
                }
              >
                <ParticipantsLetters
                  color={
                    participant.uid === user?.uid
                      ? "var(--color-lightBlue)"
                      : `#${participantColor}`
                  }
                  letter={getParticipantsFirstLetters(participant.name)}
                  label={participant.name}
                />
              </div>
            );
          })}
        </div>
        {data?.items.length ? (
          data?.items.map((item: Item) => {
            return (
              <ItemCard
                userId={user!.uid}
                itemId={item.id}
                key={item.id}
                name={item.name}
                assignedUser={item.owner}
                checked={item.checked}
                createdAt={item.createdAt}
              />
            );
          })
        ) : (
          <EmptyItemDashboard />
        )}
      </div>
      <Popover ref={popoverRef} variant={PopoverTypes.VIEW_USER} />
    </>
  );
}
