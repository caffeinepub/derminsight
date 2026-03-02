import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  public type ConsultationIntake = {
    id : Text;
    name : Text;
    email : Text;
    skinConcerns : [Text];
    skinType : Text;
    currentRoutine : Text;
    goals : Text;
    photos : [Storage.ExternalBlob];
    consentGiven : Bool;
    submittedAt : Int;
    status : Status;
  };

  public type Status = {
    #pending;
    #reviewed;
    #completed;
  };

  public type ServicePlan = {
    id : Text;
    name : Text;
    description : Text;
    priceUSD : Nat;
    features : [Text];
    isFree : Bool;
  };

  let consultationIntakes = Map.empty<Text, ConsultationIntake>();
  var nextIntakeId = 0;

  public shared ({ caller }) func submitIntake(
    name : Text,
    email : Text,
    skinConcerns : [Text],
    skinType : Text,
    currentRoutine : Text,
    goals : Text,
    photos : [Storage.ExternalBlob],
    consentGiven : Bool,
  ) : async Text {
    let id = nextIntakeId.toText();
    nextIntakeId += 1;

    let intake : ConsultationIntake = {
      id;
      name;
      email;
      skinConcerns;
      skinType;
      currentRoutine;
      goals;
      photos;
      consentGiven;
      submittedAt = Time.now();
      status = #pending;
    };

    consultationIntakes.add(id, intake);
    id;
  };

  public query ({ caller }) func getIntakeById(id : Text) : async ?ConsultationIntake {
    consultationIntakes.get(id);
  };

  public query ({ caller }) func listIntakes() : async [ConsultationIntake] {
    consultationIntakes.values().toList<ConsultationIntake>().toArray();
  };

  public shared ({ caller }) func updateIntakeStatus(id : Text, status : Status) : async () {
    let intake = switch (consultationIntakes.get(id)) {
      case (null) { Runtime.trap("Intake does not exist") };
      case (?intake) { intake };
    };
    let updatedIntake = { intake with status };
    consultationIntakes.add(id, updatedIntake);
  };

  public query ({ caller }) func getServicePlans() : async [ServicePlan] {
    [
      {
        id = "plan1";
        name = "Free Mini Audit";
        description = "Quick analysis with basic feedback";
        priceUSD = 0;
        features = ["Basic photo analysis", "Skincare tips"];
        isFree = true;
      },
      {
        id = "plan2";
        name = "Standard Consult";
        description = "Detailed analysis with personalized skincare routine";
        priceUSD = 49;
        features = [
          "In-depth photo analysis",
          "Personalized product recommendations",
          "Customized skincare routine",
        ];
        isFree = false;
      },
      {
        id = "plan3";
        name = "Premium Consult";
        description = "Comprehensive skin analysis with ongoing support";
        priceUSD = 99;
        features = [
          "All Standard features",
          "Follow-up consultations",
          "Progress tracking",
        ];
        isFree = false;
      },
    ];
  };
};
