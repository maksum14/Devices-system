<%@ page session="false" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
<title>Upload File Request Page</title>
</head>
	<body>
		${foo}
		<c:form method="POST" action="?${_csrf.parameterName}=${_csrf.token}" enctype="multipart/form-data">
				File to upload: 
			<input type="file" name="file"><br /> 
				testId<br> 
			<input type="text" name="testId" value="1">
			<input type="submit" value="Upload">
		</c:form>
		
	</body>
</html>