package nl.numworx.taoexport;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.security.auth.login.LoginContext;

import fi.dwo.commons.persistence.Dwo2ExceptionJavaTranslator;
import fi.dwo.commons.persistence.MySQLPersistenceId;
import fi.dwo.commons.persistence.entities.PersistentCourse;
import fi.dwo.commons.persistence.entities.PersistentDwoProfile;
import fi.dwo.commons.system.MD5;
import nl.uu.fi.dwo.lms.jclient.lib.rest.managers.PublicScoContextManager;
import nl.uu.fi.dwo.lms.jclient.lib.rest.managers.SecureUserAccountManager;
import nl.uu.fi.dwo.lms.jclient.lib.rest.transport.RestAuthenticator;
import nl.uu.fi.dwo.lms.jclient.lib.rest.transport.StoredRestManager;
import nl.uu.fi.dwo.rest.dom.entities.DomContext;
import nl.uu.fi.dwo.rest.dom.entities.DomCourse;
import nl.uu.fi.dwo.rest.dom.entities.DomDwoProfile;
import nl.uu.fi.dwo.rest.dom.entities.DomHasRole;
import nl.uu.fi.dwo.rest.dom.entities.DomLoginContext;
import nl.uu.fi.dwo.rest.dom.entities.DomScoContext;
import nl.uu.fi.dwo.rest.persistence.PersistenceId;
import nl.uu.fi.dwo.rest.util.Dwo2ExceptionTranslator;

public class TaoExport {

  public static void main(String[] args) throws Exception {
	  
	String username = System.getProperty("taoexport.user", "root");
	String password = System.getProperty("taoexport.pass", "test");
	
    Dwo2ExceptionTranslator.setTranslator(new Dwo2ExceptionJavaTranslator());

    Long courseId = 203030L;
    Long profileId = 106L;
    String file = "target/numworx-items.zip";
    if (args.length > 0) file = args[0];
    URL server = new URL("https://app.dwo.nl/dwo/");
    RestAuthenticator auth = StoredRestManager.getInstance().getAuthenticator();
    auth.setServerUrlPath(server);
    auth.setContext(new DomContext());
    System.err.println("user = " + username + " pass = " + password); 
    StoredRestManager.getInstance().setBasicAuthString(username, MD5.getHashString(password), "");
    
    DomLoginContext kc = SecureUserAccountManager.getLoginContext();
    auth.getContext().setDomHasRole(new DomHasRole());
    auth.getContext().getDomHasRole().setId(kc.getHasRoleId());
    
    PersistenceId cpid = PersistentCourse.buildPersistenceId(courseId);
    PersistenceId ppid = PersistentDwoProfile.buildPersistenceId(profileId);
    DomDwoProfile profile = new DomDwoProfile();
    profile.setId(ppid);
    DomCourse parent = new DomCourse();
    parent.setId(cpid);
  
    List<DomScoContext> result = PublicScoContextManager.getScosAsync(parent, profile, null).getValue();

    ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(file));
    for (DomScoContext context: result) {
        String title = context.getScoName();
        Long id = MySQLPersistenceId.getNativeId(context);
        ZipEntry entry = new ZipEntry(title + ".json");
        zip.putNextEntry(entry);
        toJSON(id, zip);
        zip.closeEntry();
        entry = new ZipEntry(title + ".css");
        zip.putNextEntry(entry);
        toCSS(id, zip);
        zip.closeEntry();
    }
// add htacces    
    ZipEntry entry = new ZipEntry(".htaccess");
    zip.putNextEntry(entry);
    toResource("/htaccess",  zip);
    zip.closeEntry();

    zip.close();
  }
 
  
  private static void toCSS(Long id, ZipOutputStream zip) throws IOException {
    URL rest = new URL( RestAuthenticator.getInstance().getServerUrlPath(), "rest/public/scoData/get/" + id + "/style.css");
    copy(rest, zip);
  }


  private static void toJSON(Long id, OutputStream out) throws IOException {
    URL rest = new URL( RestAuthenticator.getInstance().getServerUrlPath(), "rest/public/scoData/getJSONLaunchDataBytes?scoId=" + id);
    copy(rest, out);
  }

  private static void toResource(String resource, OutputStream out) throws IOException {
    URL u = TaoExport.class.getResource(resource);
    copy(u, out);
  }

  private static void copy(URL rest, OutputStream out) throws IOException {
    byte[] buffer = new byte[4*4096];
    InputStream in = rest.openStream();
    int len;
    while ( (len = in.read(buffer)) > 0) out.write(buffer, 0, len);
  }


  
}
