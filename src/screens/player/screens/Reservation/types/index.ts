export type TMyReservationData = {
  myReservation: {
    data: {
      edges: TReservation[];
    };
    message: string;
    status: number;
  };
};

export type TReservation = {
  node: {
    durationId: {
      pkDuration: number;
      startTime: string;
      endTime: string;
      price: number;
      stadium: {
        name: string;
        pkStadium: number;
        section: {
          clubId: {
            name: string;
            pkClub: number;
            locationLat: string;
            locationLong: string;
          };
        };
        type_: {
          pkType: number;
          name: string;
        };
      };
    };
    kind: string;
    date: string;
    pkReservation: number;
    owner: string;
  };
};
