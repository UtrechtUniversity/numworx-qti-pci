package nl.numworx.taoexport;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.osgi.util.promise.Promise;
import org.osgi.util.promise.Promises;

import fi.dwo.commons.persistence.Dwo2ExceptionJavaTranslator;
import fi.dwo.commons.persistence.MySQLPersistenceId;
import fi.dwo.commons.persistence.entities.PersistentCourse;
import fi.dwo.commons.persistence.entities.PersistentDwoProfile;
import nl.uu.fi.dwo.lms.jclient.lib.rest.managers.PublicCourseManager;
import nl.uu.fi.dwo.lms.jclient.lib.rest.managers.PublicScoContextManager;
import nl.uu.fi.dwo.lms.jclient.lib.rest.transport.RestAuthenticator;
import nl.uu.fi.dwo.lms.jclient.lib.rest.transport.StoredRestManager;
import nl.uu.fi.dwo.rest.dom.entities.DomContext;
import nl.uu.fi.dwo.rest.dom.entities.DomCourse;
import nl.uu.fi.dwo.rest.dom.entities.DomDwoProfile;
import nl.uu.fi.dwo.rest.dom.entities.DomScoContext;
import nl.uu.fi.dwo.rest.exceptions.Dwo2Exception;
import nl.uu.fi.dwo.rest.persistence.PersistenceId;
import nl.uu.fi.dwo.rest.util.Dwo2ExceptionTranslator;

public class TaoExport {

  public static void main(String[] args) throws Exception {
    Dwo2ExceptionTranslator.setTranslator(new Dwo2ExceptionJavaTranslator());

    Long courseId = 203030L;
    Long profileId = 106L;
    String file = "numworx-items.zip";

    URL server = new URL("https://app.dwo.nl/dwo/");
    RestAuthenticator auth = StoredRestManager.getInstance().getAuthenticator();
    auth.setServerUrlPath(server);
    auth.setContext(new DomContext());
    
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


  private static void copy(URL rest, OutputStream out) throws IOException {
    byte[] buffer = new byte[4*4096];
    InputStream in = rest.openStream();
    int len;
    while ( (len = in.read(buffer)) > 0) out.write(buffer, 0, len);
  }


  
}
