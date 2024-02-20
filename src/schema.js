export const typeDefs = `#graphql
  enum TEventType {
    workshop
    activity
    tech_talk
  }

  enum TPermission {
    public
    private
  }

  type TSpeaker {
    name: String!
  }

  type TEvent {
    id: Int!
    name: String!
    event_type: TEventType!
    permission: TPermission
    start_time: Int!
    end_time: Int!
    description: String
    speakers: [TSpeaker!]!
    public_url: String
    private_url: String!
    related_events: [Int!]!
  }

  type Query {
    getEventById(id: Int!): TEvent
    getAllEvents: [TEvent]
    getEventIds: [Int]
    getEventName: [Int]
  }
`