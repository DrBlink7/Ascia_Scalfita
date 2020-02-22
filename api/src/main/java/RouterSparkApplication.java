import static spark.Spark.*;
import static spark.Spark.get;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dal.UserService;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class RouterSparkApplication implements spark.servlet.SparkApplication {
  static Logger LOG = LoggerFactory.getLogger(RouterSparkApplication.class);
  static JSONParser parser = new JSONParser();
  static JSONArray data, kpiPref,  economics, water, gas, tlr, energy, environment;

  static {
    try {
      data = (JSONArray) parser.parse(new JsonReader("data.json").toString());
      kpiPref = (JSONArray) parser.parse(new JsonReader("kpiPref.json").toString());
      economics = (JSONArray) parser.parse(new JsonReader("economics.json").toString());
      water = (JSONArray) parser.parse(new JsonReader("water.json").toString());
      gas = (JSONArray) parser.parse(new JsonReader("gas.json").toString());
      tlr = (JSONArray) parser.parse(new JsonReader("tlr.json").toString());
      energy = (JSONArray) parser.parse(new JsonReader("energy.json").toString());
      environment = (JSONArray) parser.parse(new JsonReader("environment.json").toString());
    } catch (ParseException e) {
      e.printStackTrace();
    }
  }

  private Connection db;

  private Consumer<Exception> initExceptionHandler = (e) -> {
    LOG.error("ignite failed", e);
    System.exit(100);
  };

  @Override
  public void init() {
    initExceptionHandler((e) -> System.out.println("Uh-oh"));
    registerPath();
  }


  private void registerPath() {
    var gson = new Gson();
    path("/", () -> {
      var user = new UserService();
      var monster = new UserService();//need to implement monster class

      get("/getUserStat/:loc",(req,res) -> {
        var username = "test";
        return user.getUserData(username,req.params(":loc"));
      },gson::toJson);

      get("/getMonsterAction/:loc/:monster",(req,res) -> {
        var username = "test";
        return user.getMonsterDmg(username,req.params(":loc"),req.params(":monster"));
      },gson::toJson);

    });
    path("/api", () -> {
 //Delete this when TBT done   
      get("/graphData", (req, res) -> data);
      get("/graphData/:id", (request, response) -> data.get(Integer.parseInt(request.params(":id"))));
      get("/myGraphsData", (req, res) -> kpiPref);
      get("/economics", (req, res) -> economics);
      get("/electrics", (req, res) -> energy);
      get("/water", (req, res) -> water);
      get("/gas", (req, res) -> gas);
      get("/tlr", (req, res) -> tlr);
      get("/environment", (req, res) -> environment);
      get("/defaultPref/:dep", (req, res) -> {
        List<Integer> prefDefault = new ArrayList<Integer>();
        switch (req.params(":dep")) {
          case "water":
            prefDefault.add(1);
            prefDefault.add(4);
            break;
          case "gas":
            prefDefault.add(0);
            prefDefault.add(3);
            break;
          case "tlr":
            prefDefault.add(2);
            break;
          case "energy":
            prefDefault.add(6);
            break;
          case "environment":
            prefDefault.add(4);
            break;
          default:
            prefDefault.add(5);
            prefDefault.add(7);
            prefDefault.add(8);
            prefDefault.add(9);
        }
        return prefDefault;
      });
//Delete up when TBT done      
      
      var companyService = new dal.CompanyService();
      var departmentService = new dal.DepartmentService();
      var kpiService = new dal.KpiService();
//OK
      
      get("/testHana",(req,res) -> kpiService.hanaTest(), gson::toJson);

      get("/test",(req,res) -> kpiService.test(), gson::toJson);

      get("/companies/:id", (req, res) -> companyService.Detail(req.params(":id")), gson::toJson);
      get("/companies", (req, res) -> companyService.List(), gson::toJson);
//OK
      get("/department/:id", (req, res) -> departmentService.Detail(req.params(":id")), gson::toJson);
      get("/department", (req, res) -> departmentService.List(), gson::toJson);

//TBT on frontend        
      get("/homeKpis", (req, res) -> kpiService.List(""), gson::toJson);
      get("/defaultKpis", (req, res) -> kpiService.List(""), gson::toJson);
      get("/groupKpis/:dep", (req, res) -> kpiService.List(req.params(":dep")), gson::toJson);
      get("/getGraphData/:id/:period", (req, res) -> kpiService.getDetailData(req.params(":id"), Integer.valueOf(req.params(":period"))), gson::toJson);
      get("/getMiniGraphData/:id", (req, res) -> kpiService.getMiniData(Integer.valueOf(req.params(":id"))), gson::toJson);
      
//OK
      get("/userPref", (req, res) -> kpiService.userPref(), gson::toJson);
      get("/defaultPref/:dep", (req, res) -> kpiService.defaultPref(req.params(":dep")),gson::toJson);
      
//OK
      put("/modifyPrefs", (req, res) -> {
        List<Integer> prefs = new Gson().fromJson(req.body(), new TypeToken<List<Integer>>() {
        }.getType());
        return kpiService.setPrefs(prefs);
      });
      delete("/modifyPrefs", (req, res) -> kpiService.deletePrefs());

    });
  }
}
