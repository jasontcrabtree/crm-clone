﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240113115826_NewMigrationAfterRemovingSelfReference")]
    partial class NewMigrationAfterRemovingSelfReference
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.ConnectionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ConnectionLabel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConnectionType")
                        .HasColumnType("int");

                    b.Property<int>("ContactId")
                        .HasColumnType("int");

                    b.Property<int?>("ContactModelId")
                        .HasColumnType("int");

                    b.Property<long>("CreatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<int>("InteractionId")
                        .HasColumnType("int");

                    b.Property<int?>("InteractionModelId")
                        .HasColumnType("int");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.Property<int?>("OrganisationModelId")
                        .HasColumnType("int");

                    b.Property<long>("UpdatedTimeUnix")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ContactModelId");

                    b.HasIndex("InteractionModelId");

                    b.HasIndex("OrganisationModelId");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("backend.Models.ContactModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactFirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactSurname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("CreatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<long>("UpdatedTimeUnix")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("backend.Models.InteractionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("CreatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<DateOnly>("InteractionDate")
                        .HasColumnType("date");

                    b.Property<string>("InteractionNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InteractionTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InteractionType")
                        .HasColumnType("int");

                    b.Property<long>("UpdatedTimeUnix")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Interactions");
                });

            modelBuilder.Entity("backend.Models.OrganisationModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("CreatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<string>("OrganisationAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganisationCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganisationCountry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganisationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganisationNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganisationPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrganisationType")
                        .HasColumnType("int");

                    b.Property<string>("OrganisationWebsite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UpdatedTimeUnix")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Organisations");
                });

            modelBuilder.Entity("backend.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("CreatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UpdatedTimeUnix")
                        .HasColumnType("bigint");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.ConnectionModel", b =>
                {
                    b.HasOne("backend.Models.ContactModel", "ContactModel")
                        .WithMany("ConnectionModels")
                        .HasForeignKey("ContactModelId");

                    b.HasOne("backend.Models.InteractionModel", "InteractionModel")
                        .WithMany("ConnectionModels")
                        .HasForeignKey("InteractionModelId");

                    b.HasOne("backend.Models.OrganisationModel", "OrganisationModel")
                        .WithMany("ConnectionModels")
                        .HasForeignKey("OrganisationModelId");

                    b.Navigation("ContactModel");

                    b.Navigation("InteractionModel");

                    b.Navigation("OrganisationModel");
                });

            modelBuilder.Entity("backend.Models.ContactModel", b =>
                {
                    b.Navigation("ConnectionModels");
                });

            modelBuilder.Entity("backend.Models.InteractionModel", b =>
                {
                    b.Navigation("ConnectionModels");
                });

            modelBuilder.Entity("backend.Models.OrganisationModel", b =>
                {
                    b.Navigation("ConnectionModels");
                });
#pragma warning restore 612, 618
        }
    }
}