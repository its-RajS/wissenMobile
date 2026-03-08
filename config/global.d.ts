type OnBoardingSlidesTypes = {
    title: string;
    secondaryTitle: string;
    subTitle: string;
    image: React.ReactNode;
    color: string;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    avatar: string;
    stripeCustomerId: string;
    githubUserName: string;
    role: string;
    pushToken?: string;
    verified: boolean;
    reviews: ReviewProps[];
    orders: OrderProps[];
    reviewsReplies: ReviewProps[];
    Notification: NotificationProps[];
    Tickets: TicketProps[];
    createdAt: Date;
    updatedAt: Date;
  };


  type ReviewProps = {
    id: string;
    user: UserProps;
    userId: string;
    courseId: string;
    rating: number;
    replies: any[];
    comment: string;
    createdAt: any;
    updatedAt: any;
  };
  
  type OrderProps = {
    id: string;
    userId: string;
    payment_info: string | null;
    courseId: string;
    createdAt: any;
    updatedAt: any;
  };

  type NotificationProps = {
    id: string;
    title: string;
    message: string;
    status: string;
    user?: UserProps;
    creatorId: string;
    receiverId: string | null;
    redirect_link: string | null;
    createdAt: Date;
    updatedAt: Date;
  };

  type TicketProps = {
    id: string;
    creatorId: string;
    ticketTitle: string;
    reply: TicketRepliesProps[];
    details: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };

  type TicketRepliesProps = {
    id: string;
    ticketId: string;
    reply: string;
    user: UserProps;
    replyId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
  