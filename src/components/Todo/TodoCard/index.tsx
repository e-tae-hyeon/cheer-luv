import colors from "common/styles/colors";
import { SvgIcon } from "components/@base";
import { useSession } from "next-auth/react";
import React from "react";
import formatDate from "utils/formatDate";
import TodoCheerButton from "../TodoCheerButton";
import TodoOwnActions from "../TodoOwnActions";

type Props = {
  id: number;
  authorId: string;
  authorNickname: string;
  date: Date;
  content: string;
  likeCount: number;
};

function TodoCard({
  id,
  authorId,
  authorNickname,
  date,
  content,
  likeCount,
}: Props) {
  const { data } = useSession();

  return (
    <div className="flex flex-col justify-between gap-4 p-4 bg-white border border-gray-300 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <span>{authorNickname}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-300">{formatDate(date)}</span>
        </div>
        {data?.user.id === authorId && <TodoOwnActions todoId={id} />}
      </div>
      <div className="flex-1 break-all">{content}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-400">
          <SvgIcon name="heart" size={16} color={colors.gray[400]} />
          {likeCount}
        </div>
        <TodoCheerButton todoId={id} />
      </div>
    </div>
  );
}

export default React.memo(TodoCard);
