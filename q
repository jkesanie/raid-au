[1mdiff --git a/api-svc/idl-raid-v2/build.gradle b/api-svc/idl-raid-v2/build.gradle[m
[1mindex f05dbe1d..866376fd 100644[m
[1m--- a/api-svc/idl-raid-v2/build.gradle[m
[1m+++ b/api-svc/idl-raid-v2/build.gradle[m
[36m@@ -138,7 +138,9 @@[m [mtasks.openApiGenerate{[m
 //  inputs.files templateDirName[m
   /* make sure task is re-run if reference files are changed, it appears [m
   the task only looks at the base file. */[m
[31m-  // inputs.files fileTree("src/**/*.yaml")[m
[32m+[m[32m  inputs.files(fileTree("src") {[m
[32m+[m[32m    include("**/*.yaml")[m
[32m+[m[32m  })[m
 }[m
 [m
 /* tell Gradle to generate the openapi code before compiling it (without this,[m
[1mdiff --git a/raid-agency-app/src/entities/subject/forms/subjects-form/SubjectsForm.tsx b/raid-agency-app/src/entities/subject/forms/subjects-form/SubjectsForm.tsx[m
[1mindex 54de540c..48ae9767 100644[m
[1m--- a/raid-agency-app/src/entities/subject/forms/subjects-form/SubjectsForm.tsx[m
[1m+++ b/raid-agency-app/src/entities/subject/forms/subjects-form/SubjectsForm.tsx[m
[36m@@ -94,17 +94,26 @@[m [mexport function SubjectsForm({[m
     resetState();[m
     clearErrors(key);[m
   }[m
[32m+[m
[32m+[m[32m   useEffect(() => {[m
[32m+[m[32m    getSelectedCodesData().forEach((code, i) => {[m
[32m+[m[32m      if(code.url && !getValues(key)?.some((subject: any) => subject.id === code.url)) {[m
[32m+[m[32m        append(generator(code.url));[m
[32m+[m[32m      }[m
[32m+[m[32m    });[m
[32m+[m[32m    }, [ remove, fields]);[m
[32m+[m
   console.log("Selected Codes Data:", getValues(key));[m
   const handleAddItem = () => {[m
[32m+[m[32m    //fields.forEach((field, index) => remove(index));[m
     const selections = modifySubjectSelection();[m
[31m-   [m
     selections?.forEach((code, i) => {[m
[32m+[m[32m      if(!code.id) return;[m
       if(code.url && !getValues(key)?.some((subject: any) => subject.id === code.url)) {[m
[31m-        append(generator(code.url));[m
[31m-        trigger(key);[m
[31m-        clearErrors(key);[m
[32m+[m[32m        append(generator(code?.url));[m
       }[m
     });[m
[32m+[m[32m    clearErrors(key);[m
   }[m
 [m
   const handleRemoveSelection = () => {[m
