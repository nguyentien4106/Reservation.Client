FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine as build

ARG BUILD_CONFIGURATION=Release

WORKDIR /src 

COPY ["Reservation.Server/Reservation.Server.csproj", "Reservation.Server/"] 

RUN dotnet restore "Reservation.Server/Reservation.Server.csproj"

COPY . .

WORKDIR "/src/Reservation.Server"

RUN dotnet build "Reservation.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Reservation.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT [ "dotnet", "Reservation.Server.dll" ]