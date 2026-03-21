import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types
  type Player = {
    username : Text;
    userId : Text;
    gameLevel : Nat;
    registeredAt : Time.Time;
  };

  module Player {
    public func compare(player1 : Player, player2 : Player) : Order.Order {
      switch (Nat.compare(player2.gameLevel, player1.gameLevel)) {
        case (#equal) { Text.compare(player1.username, player2.username) };
        case (order) { order };
      };
    };
  };

  type ChatMessage = {
    sender : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type Announcement = {
    title : Text;
    body : Text;
    author : Text;
    timestamp : Time.Time;
  };

  type TournamentEntry = {
    playerName : Text;
    playerId : Text;
    gameLevel : Nat;
    paymentNote : Text;
  };

  type Complaint = {
    username : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type PlayerRegistration = {
    username : Text;
    userId : Text;
    gameLevel : Nat;
  };

  // Storage
  let players = Map.empty<Text, Player>();
  var chatMessages = List.empty<ChatMessage>();
  var announcements = List.empty<Announcement>();
  var tournaments = List.empty<TournamentEntry>();
  var complaints = List.empty<Complaint>();

  // Functions
  public shared ({ caller }) func registerPlayer(input : PlayerRegistration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register players");
    };

    if (players.containsKey(input.userId)) {
      Runtime.trap("Player with ID " # input.userId # " already exists");
    };
    let player : Player = {
      username = input.username;
      userId = input.userId;
      gameLevel = input.gameLevel;
      registeredAt = Time.now();
    };
    players.add(input.userId, player);
  };

  public shared ({ caller }) func sendChatMessage(sender : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send chat messages");
    };

    let message : ChatMessage = {
      sender;
      content;
      timestamp = Time.now();
    };
    chatMessages.add(message);
  };

  public shared ({ caller }) func postAnnouncement(title : Text, body : Text, author : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can post announcements");
    };

    let announcement : Announcement = {
      title;
      body;
      author;
      timestamp = Time.now();
    };

    announcements.add(announcement);
  };

  public shared ({ caller }) func registerTournament(entry : TournamentEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register for tournaments");
    };

    tournaments.add(entry);
  };

  public shared ({ caller }) func sendComplaint(username : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send complaints");
    };

    let complaint : Complaint = {
      username;
      message;
      timestamp = Time.now();
    };
    complaints.add(complaint);
  };

  // Queries
  public query ({ caller }) func getLeaderboard() : async [Player] {
    players.values().toArray().sort();
  };

  public query ({ caller }) func getChatMessages() : async [ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view chat messages");
    };
    chatMessages.toArray();
  };

  public query ({ caller }) func getAnnouncements() : async [Announcement] {
    announcements.toArray();
  };

  public query ({ caller }) func getTournaments() : async [TournamentEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tournament registrations");
    };

    tournaments.toArray();
  };

  public query ({ caller }) func getComplaints() : async [Complaint] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view complaints");
    };
    complaints.toArray();
  };

  public query ({ caller }) func getPlayer(userId : Text) : async Player {
    switch (players.get(userId)) {
      case (null) { Runtime.trap("Player with ID " # userId # " does not exist") };
      case (?player) { player };
    };
  };
};
