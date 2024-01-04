# Dockerfile for .NET

# Use the official SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS development

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . ./

# Expose the port the app runs on
EXPOSE 5000

# Start the application with dotnet watch for live reloading
CMD ["dotnet", "watch", "run"]